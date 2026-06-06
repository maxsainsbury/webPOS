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

  useEffect(() => {
    const initialLoadCustomers = async () => {
      if (orders.length !== 0) {
        loadCustomers();
      }
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

  const openOrder = async (customer, order) => {
    let fetchedOrder;
    if (order.order_id > 0) {
      fetchedOrder = await getOrderById(order);
      if (!fetchedOrder) return;
      if (fetchedOrder.order.in_use) {
        const proceed = await confirm(
          "The order is probably open on another machine, in order to not lose changes please close on the other machine, if this is an error you can open anyway",
          {
            title: "Order in use",
            kind: "warning",
            cancelLabel: "Go Back",
            okLabel: "Open Order",
          },
        );
        if (!proceed) return;
      } else {
        fetchedOrder.order.in_use = true;
        await updateInUse(fetchedOrder.order);
      }
    } else {
      fetchedOrder = { order: order, items: [], mods: [] };
    }
    setCustomerEditActive(false);
    setCustomer(customer);
    setCurrentOrder(fetchedOrder);
    setModifiedOrder(fetchedOrder);
    setActiveView("order");
  };

  const saveOrder = async (fullOrder) => {
    if (fullOrder.items.length > 0) {
      if (fullOrder.order.order_id > 0) {
        await updateOrder(fullOrder);
      } else {
        await addOrder(fullOrder);
      }
      fullOrder.order.in_use = false;
      await updateInUse(fullOrder.order);
    } else {
      if (fullOrder.order.order_id > 0) {
        await deleteOrderFromDB(fullOrder.order.order_id);
      }
    }
    const updatedOrders = await fetchOrders();
    setOrders(updatedOrders);
    await loadCustomers(updatedOrders);
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
