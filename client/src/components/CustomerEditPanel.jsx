import "./CustomerEditPanel.css";
import { useCustomer } from "../hooks/useCustomer.js";
import TouchBtn from "./TouchBtn.jsx";
import { formatPhone } from "../helpers/helperFunctions.js";
import { addCustomer, updateCustomer } from "../api/customer.js";
import { digitsOnly } from "../helpers/regex.js";
import { useCallback, useEffect } from "react";

const CustomerEditPanel = (props) => {
  const { customer, setCustomer, updateField } = useCustomer(props.customer);
  const excludeFields = ["customer_id", "created_at", "updated_at", "credit"];
  const fieldLabels = {
    f_name: "First Name",
    l_name: "Last Name",
    phone: "Phone",
    email: "Email",
    address_line1: "Address Line 1",
    address_line2: "Address Line 2",
    city: "City",
    provence: "Provence",
    postal_code: "Postal Code",
    delivery_instructions: "Delivery Instructions",
  };

  const handleChange = (event) => {
    updateField(event.target.name, event.target.value);
    if (event.target.name === "phone") {
      updateField(event.target.name, formatPhone(event.target.value));
    }
  };

  const updateOrAdd = useCallback(async () => {
    try {
      if (customer.f_name) {
        let changed = false;
        Object.keys(customer).forEach((key) => {
          if (customer[key] !== props.customer[key]) {
            changed = true;
          }
        });
        if (changed) {
          if (customer.customer_id > 0) {
            customer.phone = customer.phone.replace(digitsOnly, "");
            await updateCustomer(customer);
          } else {
            customer.phone = customer.phone.replace(digitsOnly, "");
            const customerResponse = await addCustomer(customer);
            customer.customer_id = customerResponse.insertId;
            console.log(customerResponse);
          }
        }
        const currentDateTime = new Date();
        const scheduledDate = currentDateTime.toISOString().slice(0, 10);
        const scheduledTime = `${String(currentDateTime.getHours()).padStart(2, "0")}:${String(currentDateTime.getMinutes()).padStart(2, "0")}:00`;
        props.openOrder(customer, {
          order_id: 0,
          customer_id: customer.customer_id,
          employee_id: props.user.employee_id,
          order_number: 1,
          order_type: props.orderType,
          order_status: "Pending",
          is_future_order: false,
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          payment_status: "Pending",
          special_instructions: "none",
          in_use: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [
    customer,
    props.customer,
    props.openOrder,
    props.user.employee_id,
    props.order_type,
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        updateOrAdd();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [updateOrAdd]);

  return (
    <div id="darkenBackground">
      <div id="customerInfo">
        <div id="customerBox">
          {Object.keys(customer)
            .filter((key) => !excludeFields.includes(key))
            .map((key) => (
              <div className="inputPair" key={key}>
                <label htmlFor={key}>{fieldLabels[key]}:</label>
                <input
                  id={key}
                  type="text"
                  name={key}
                  value={customer[key] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          <TouchBtn
            id="customerEditBtn"
            name="Next"
            className="rectangle"
            disabled={
              customer.f_name.length <= 0 ||
              customer.phone.replace(digitsOnly, "").length !== 10
            }
            onClick={updateOrAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerEditPanel;
