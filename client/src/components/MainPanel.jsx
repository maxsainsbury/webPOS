import './MainPanel.css';
import { useState } from 'react';
import DashboardPanel from "./DashboardPanel.jsx";
import OrderPanel from "./OrderPanel.jsx";
import TopBar from "./TopBar.jsx";
import SideBar from "./SideBar.jsx";
import CustomerSearchPanel from "./CustomerSearchPanel.jsx";
import { useCustomer } from "../hooks/useCustomer.js";
import CustomerEditPanel from "./CustomerEditPanel.jsx";

const MainPanel = (props) => {
    const { customer, setCustomer } = useCustomer();

    const [activeView, setActiveView] = useState('dashboard', 'order');
    const [customerSearchActive, setCustomerSearchActive] = useState(false);
    const [customerEditActive, setCustomerEditActive] = useState(false);

    const views = {
        dashboard: <DashboardPanel user={props.user} />,
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
            <SideBar onOrder={setCustomerSearchActive} />
            {views[activeView]}
            {customerSearchActive ? <CustomerSearchPanel onSearch={customerSearch} /> : null}
            {customerEditActive ? <CustomerEditPanel customer={customer} onNext={openOrder} /> : null}
        </div>
    );
}

export default MainPanel;