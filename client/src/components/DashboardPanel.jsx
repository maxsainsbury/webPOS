import "./DashboardPanel.css";
import TouchBtn from "./TouchBtn.jsx";

const DashboardPanel = (props) => {
  return (
    <div id="dashboardPanel">
      {/* find the customer associated with each order */}
      {props.orders.map((order) => {
        const customer = props.customers.find(
          (c) => c.customer_id === order.customer_id,
        );
        {
          /* if the customer is not found, skip this order */
        }
        if (!customer) return null;
        return (
          /* if the customer is found, render the TouchBtn for the order */
          <TouchBtn
            key={order.order_id}
            name={customer.f_name + " " + customer.l_name}
            className="rectangle orderBtn"
            onClick={() => props.openOrder(customer, order)}
          />
        );
      })}
    </div>
  );
};

export default DashboardPanel;
