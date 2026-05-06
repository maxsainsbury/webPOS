import './MainPanel.css';
import {useState, useEffect, useCallback} from 'react';
import DashboardPanel from "./DashboardPanel.jsx";
import OrderPanel from "./OrderPanel.jsx";
import TopBar from "./TopBar.jsx";
import SideBar from "./SideBar.jsx";
import CustomerSearchPanel from "./CustomerSearchPanel.jsx";
import {useCustomer} from "../hooks/useCustomer.js";
import CustomerEditPanel from "./CustomerEditPanel.jsx";
import {usePendingOrders} from "../hooks/useOrders.js";
import {addOrder, getOrderById, getOrdersByPaymentStatus, updateInUse, updateOrder} from "../api/orders.js";
import {getCustomerById} from "../api/customer.js";
import {useItems} from "../hooks/useItems.js";
import {getItems} from "../api/items.js";
import { confirm } from '@tauri-apps/plugin-dialog'

const MainPanel = (props) => {
    const { customer, setCustomer } = useCustomer();
    const [ orderType, setOrderType ] = useState("");

    const [activeView, setActiveView] = useState('loading');
    const [customerSearchActive, setCustomerSearchActive] = useState(false);
    const [customerEditActive, setCustomerEditActive] = useState(false);

    const fetchOrders = useCallback(() => getOrdersByPaymentStatus('Pending'), []);
    const {orders, setOrders} = usePendingOrders(fetchOrders);

    const [customers, setCustomers] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [modifiedOrder, setModifiedOrder] = useState({});

    const {items, setItems} = useItems(getItems);

    useEffect(() => {
        const loadCustomers = async () => {
            if (orders.length === 0) {
                setActiveView('dashboard');
                return;
            }

            const customerIds= orders.map(order => order.customer_id);
            const data = await getCustomerById(customerIds);
            if (data) {
                setCustomers(data);
                setActiveView('dashboard');
            }
        }
        loadCustomers();
    }, [orders]);

    const customerSearch = (searchedCustomer) => {
        if(searchedCustomer) {
            setCustomerSearchActive(false);
            setCustomer(searchedCustomer);
            setCustomerEditActive(true);
        }
    }

    const openOrder = async (customer, order) => {
        let fetchedOrder;
        if (order.order_id > 0) {
            fetchedOrder = await getOrderById(order);
            if (!fetchedOrder) return;
            console.log(fetchedOrder);
            if (fetchedOrder.order.in_use) {
                const proceed = await confirm('The order is probably open on another machine, in order to not lose changes please close on the other machine, if this is an error you can open anyway', {
                    title: 'Order in use',
                    kind: 'warning',
                    cancelLabel: 'Go Back',
                    okLabel: 'Open Order'
                });
                if (!proceed) return;
            } else {
                fetchedOrder.order.in_use = true;
                await updateInUse(fetchedOrder.order);
            }
        }
        else {
            fetchedOrder = {order: order, items: [], mods: []};
        }
        setCustomerEditActive(false);
        setCustomer(customer);
        setCurrentOrder(fetchedOrder);
        setModifiedOrder(fetchedOrder);
        setActiveView('order');

    }

    const saveOrder = async (fullOrder) => {


        let response;
        if(fullOrder.order.order_id > 0) {
            response = await updateOrder(fullOrder);
            console.log(response);
        }
        else {
            response = await addOrder(fullOrder)
            console.log(response);
        }
    }

    const modifyOrder = (item, editType) => {
        switch (editType) {
            case 'add':
                setModifiedOrder(prev => ({
                    ...prev,
                    items: [...(prev.items ?? []), {...item, quantity: 1}]
                }));
                break;
            case 'delete':
                setModifiedOrder(prev => ({
                    ...prev,
                    items: prev.items.filter(i => i.order_item_id !== item.order_item_id)
                }));
                break;
        }
    }

    return (
        <div id='mainpanel'>
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
            {activeView === 'dashboard' &&
                <DashboardPanel
                    user={props.user}
                    orders={orders}
                    customers={customers}
                    openOrder={openOrder}
                />}
            {activeView === 'order' &&
                <OrderPanel
                    user={props.user}
                    customer={customer}
                    items={items}
                    modifyOrder={modifyOrder}
                    orderType={orderType}
                />}
            {customerSearchActive ?
                <CustomerSearchPanel
                    onSearch={customerSearch}
                /> : null}
            {customerEditActive ?
                <CustomerEditPanel
                    customer={customer}
                    openOrder={openOrder}
                    user={props.user}
                /> : null}
        </div>
    );
}

export default MainPanel;