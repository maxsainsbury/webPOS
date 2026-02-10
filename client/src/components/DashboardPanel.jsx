import './DashboardPanel.css';
import TouchBtn from "./TouchBtn.jsx";

const DashboardPanel = (props) => {


    return (
        <div id="dashboardPanel">
            <p>{props.user.f_name}</p>
        </div>
    )
}

export default DashboardPanel;