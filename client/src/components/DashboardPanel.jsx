import './DashboardPanel.css';
import TouchBtn from "./TouchBtn.jsx";

const DashboardPanel = (props) => {

    return (
        <div id="dashboardPanel">
            {props.orders.map((order) => {
                const customer = props.customers.find(c => c.customer_id === order.customer_id);
                if (!customer) return null;
                return (
                    <TouchBtn
                        key={order.order_id}
                        name={customer.f_name + " " + customer.l_name}
                        className="rectangle orderBtn"
                    />
                );
            })}
        </div>
    )
}

export default DashboardPanel;