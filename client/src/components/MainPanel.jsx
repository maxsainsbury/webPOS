import "./MainPanel.css";
import { useState, useEffect, useCallback } from "react";
import DashboardPanel from "./DashboardPanel.jsx";
import OrderPanel from "./OrderPanel.jsx";
import TopBar from "./TopBar.jsx";
import SideBar from "./SideBar.jsx";
import CustomerSearchPanel from "./CustomerSearchPanel.jsx";
import { useCustomer } from "../hooks/useCustomer.js";
import CustomerEditPanel from "./CustomerEditPanel.jsx";
import { usePendingOrders } from "../hooks/useOrders.js";
import {
  addOrder,
  getOrderById,
  getOrdersByPaymentStatus,
  updateInUse,
  updateOrder,
} from "../api/orders.js";
import { getCustomerById } from "../api/customer.js";
import { useItems } from "../hooks/useItems.js";
import { getItems } from "../api/items.js";
import { confirm } from "@tauri-apps/plugin-dialog";

const MainPanel = (props) => {
  //create a variable to store customer info
  const { customer, setCustomer } = useCustomer();
  //create a variable to store order type
  const [orderType, setOrderType] = useState("");

  //create a variable to change the active view
  const [activeView, setActiveView] = useState("loading");
  //create a variable to change if the customer search view is active
  const [customerSearchActive, setCustomerSearchActive] = useState(false);
  //create a variable to change if the customer edit view is active
  const [customerEditActive, setCustomerEditActive] = useState(false);

  //get all pending orders from the database
  const fetchOrders = useCallback(
    () => getOrdersByPaymentStatus("Pending"),
    [],
  );
  //store the orders just fetched in a state variable
  const { orders, setOrders } = usePendingOrders(fetchOrders);

  //create a variable to store customer info
  const [customers, setCustomers] = useState([]);
  //create a variable to store the current order
  const [currentOrder, setCurrentOrder] = useState({});
  //create a variable to store the modified order
  const [modifiedOrder, setModifiedOrder] = useState({});

  //create a variable to store all the items in the database
  const { items, setItems } = useItems(getItems);

  //function to load customers
  const loadCustomers = async (updatedOrders = orders) => {
    //get a array of all the customer ids from the orders
    const customerIds = updatedOrders.map((order) => order.customer_id);
    //get the customer data from the server
    const data = await getCustomerById(customerIds);
    //if the data is not null, set the customers state variable to the data
    if (data) {
      setCustomers(data);
    }
  };

  //function to load customers associated with the pending orders
  useEffect(() => {
    const initialLoadCustomers = async () => {
      //if there are no pending orders
      if (orders.length === 0) {
        //set the active view to dashboard
        setActiveView("dashboard");
        return;
      }
      //if there are pending orders, load the customers associated with them
      loadCustomers();
      setActiveView("dashboard");
    };
    initialLoadCustomers();
  }, [orders]);

  //function to handle the searched customer
  const customerSearch = (searchedCustomer) => {
    //if the searched customer is not null
    if (searchedCustomer) {
      //change the view to customer edit and set the customer
      setCustomerSearchActive(false);
      setCustomer(searchedCustomer);
      setCustomerEditActive(true);
    }
  };

  //function to handle opening an order
  const openOrder = async (customer, order) => {
    //initialize a variable to store the fetched order
    let fetchedOrder;
    //if the order exists in the database
    if (order.order_id > 0) {
      //fetch the order from the database
      fetchedOrder = await getOrderById(order);
      //if the order could not be fetched, return
      if (!fetchedOrder) return;
      //if the orders in_use flag is true
      if (fetchedOrder.order.in_use) {
        //warn the user that the order is in use and ask if they want to open anyway
        const proceed = await confirm(
          "The order is probably open on another machine, in order to not lose changes please close on the other machine, if this is an error you can open anyway",
          {
            title: "Order in use",
            kind: "warning",
            cancelLabel: "Go Back",
            okLabel: "Open Order",
          },
        );
        //if the user does not want to proceed, return
        if (!proceed) return;
      }
      //if the order is not in use or the user wants to proceed
      else {
        //set the order in use to true
        fetchedOrder.order.in_use = true;
        //update the database so the orders in use flag is set to true
        await updateInUse(fetchedOrder.order);
      }
    }
    //if the order is not in the database
    else {
      //set default values for the order object
      fetchedOrder = { order: order, items: [], mods: [] };
    }
    //close the customer edit vies
    setCustomerEditActive(false);
    //set the customer to the fetched order's customer
    setCustomer(customer);
    //set the current order to the fetched order
    setCurrentOrder(fetchedOrder);
    //set the modified order to the fetched order
    setModifiedOrder(fetchedOrder);
    //set the active view to the order view
    setActiveView("order");
  };

  //function to save the order
  const saveOrder = async (fullOrder) => {
    //if the order already exists in the database
    if (fullOrder.order.order_id > 0) {
      //update the order in the database
      await updateOrder(fullOrder);
    }
    //if the order does not exist in the database
    else {
      //add the order to the database
      const response = await addOrder(fullOrder);
      //set the order id to the response's order id
      fullOrder.order.order_id = response.order.insertId;
    }
    //set the order in use to false
    fullOrder.order.in_use = false;
    //update the order in use flag in the database
    await updateInUse(fullOrder.order);
    //fetch the new pending orders list from the database
    const updatedOrders = await fetchOrders();
    //set the orders state variable to the updated orders
    setOrders(updatedOrders);
    //load the customers for the updated orders
    await loadCustomers(updatedOrders);
    //set the active view to the dashboard
    setActiveView("dashboard");
  };

  //function to modify the current order
  const modifyOrder = (item, editType) => {
    switch (editType) {
      //if user is adding an item to the order
      case "add":
        //add the item to the end of the items array
        setModifiedOrder((prev) => ({
          ...prev,
          items: [...(prev.items ?? []), { ...item, quantity: 1 }],
        }));
        break;
      //if user is deleting an item from the order
      case "delete":
        setModifiedOrder((prev) => ({
          ...prev,
          items: prev.items.filter((_, i) => i !== item),
        }));
        break;
    }
  };

  return (
    <div id="mainpanel">
      {/* display the top bar and side bar in the main panel */}
      <TopBar />
      <SideBar
        onOrder={setCustomerSearchActive}
        activeView={activeView}
        order={currentOrder}
        modifiedOrder={modifiedOrder}
        modifyOrder={modifyOrder}
        setOrder={setCurrentOrder}
        setOrderType={setOrderType}
        items={items}
        saveOrder={saveOrder}
      />
      {/* if the active view is dashboard, display the dashboard panel */}
      {activeView === "dashboard" && (
        <DashboardPanel
          user={props.user}
          orders={orders}
          customers={customers}
          openOrder={openOrder}
        />
      )}
      {/* if the active view is order, display the order panel */}
      {activeView === "order" && (
        <OrderPanel
          user={props.user}
          customer={customer}
          items={items}
          modifyOrder={modifyOrder}
          orderType={orderType}
        />
      )}
      {/* if the customer search view is active, display the customer search panel */}
      {customerSearchActive ? (
        <CustomerSearchPanel onSearch={customerSearch} />
      ) : null}
      {/* if the customer edit view is active, display the customer edit panel */}
      {customerEditActive ? (
        <CustomerEditPanel
          customer={customer}
          openOrder={openOrder}
          user={props.user}
          orderType={orderType}
        />
      ) : null}
    </div>
  );
};

export default MainPanel;
