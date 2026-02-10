import './MainPanel.css';
import { useState } from 'react';
import DashboardPanel from "./DashboardPanel.jsx";
import TopBar from "./TopBar.jsx";
import SideBar from "./SideBar.jsx";
import CustomerSearchPanel from "./CustomerSearchPanel.jsx";
import { useCustomer} from "../hooks/useCustomer.js";

const MainPanel = (props) => {
    const { customer, setCustomer } = useCustomer();

    const [activeView, setActiveView] = useState('dashboard', 'order');
    const [customerSearchActive, setCustomerSearchActive] = useState(false);

    const views = {
        dashboard: <DashboardPanel user={props.user} />
    }

    return (
        <div id='mainpanel'>
            <TopBar />
            <SideBar onOrder={setCustomerSearchActive} />
            {views[activeView]}
            {customerSearchActive ? <CustomerSearchPanel onSearch={setCustomer} /> : null}
        </div>
    );
}

export default MainPanel;