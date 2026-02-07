import './MainPanel.css';
import { useState } from 'react';
import DashboardPanel from "../../Dashboard/DashboardPanel/DashboardPanel.jsx";

const MainPanel = () => {

    const [activeView, setActiveView] = useState('dashboard');

    const views = {
        dashboard: <DashboardPanel />
    }

    return (
        <>
            {views[activeView]}
        </>
    );
}

export default MainPanel;