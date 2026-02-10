import './MainPanel.css';
import { useState } from 'react';
import DashboardPanel from "./DashboardPanel.jsx";
import TopBar from "./TopBar.jsx";
import SideBar from "./SideBar.jsx";

const MainPanel = (props) => {

    const [activeView, setActiveView] = useState('dashboard');

    const views = {
        dashboard: <DashboardPanel user={props.user} />
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