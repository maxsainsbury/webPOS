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
import {getOrdersByPaymentStatus} from "../api/orders.js";
import {getCustomerById} from "../api/customer.js";

const MainPanel = (props) => {
    const { customer, setCustomer } = useCustomer();

    const [activeView, setActiveView] = useState('loading');
    const [customerSearchActive, setCustomerSearchActive] = useState(false);
    const [customerEditActive, setCustomerEditActive] = useState(false);

    const fetchOrders = useCallback(() => getOrdersByPaymentStatus('Pending'), []);
    const {orders, setOrders} = usePendingOrders(fetchOrders);
    const [customers, setCustomers] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});

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

    const views = {
        dashboard: <DashboardPanel user={props.user} orders={orders} customers={customers} setCurrentOrder={setCurrentOrder} />,
        order: <OrderPanel user={props.user} customer={customer} />,
    }

    const customerSearch = (searchedCustomer) => {
        if(searchedCustomer) {
            setCustomerSearchActive(false);
            setCustomer(searchedCustomer);
            setCustomerEditActive(true);
        }
    }

    const openOrder = (editedCustomer) => {
        setCustomerEditActive(false);
        setCustomer(editedCustomer);
        setActiveView('order');

    }

    return (
        <div id='mainpanel'>
            <TopBar />
            <SideBar onOrder={setCustomerSearchActive} activeView={activeView} />
            {views[activeView]}
            {customerSearchActive ? <CustomerSearchPanel onSearch={customerSearch} /> : null}
            {customerEditActive ? <CustomerEditPanel customer={customer} onNext={openOrder} /> : null}
        </div>
    );
}

export default MainPanel;