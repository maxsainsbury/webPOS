import './MainPanel.css';
import { useState } from 'react';
import DashboardPanel from "../../Dashboard/DashboardPanel/DashboardPanel.jsx";
import TopBar from "../TopBar/TopBar.jsx";
import SideBar from "../SideBar/SideBar.jsx";

const MainPanel = () => {

    const [activeView, setActiveView] = useState('dashboard');

    const views = {
        dashboard: <DashboardPanel />
    }

    return (
        <div id='mainpanel'>
            <TopBar />
            <SideBar />
            {views[activeView]}
        </div>
    );
}

export default MainPanel;