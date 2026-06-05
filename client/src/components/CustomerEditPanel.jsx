import "./CustomerEditPanel.css";
import { useCustomer } from "../hooks/useCustomer.js";
import TouchBtn from "./TouchBtn.jsx";
import { formatPhone } from "../helpers/helperFunctions.js";
import { addCustomer, updateCustomer } from "../api/customer.js";
import { digitsOnly } from "../helpers/regex.js";
import { useCallback, useEffect } from "react";

const CustomerEditPanel = (props) => {
  //take the customer info from the props and use it to initialize the customer state
  const { customer, setCustomer, updateField } = useCustomer(props.customer);
  //define the fields to exclude from the form
  const excludeFields = ["customer_id", "created_at", "updated_at", "credit"];
  //define the labes associated with the key of the customer object
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

  //function to run when data in the form changes
  const handleChange = (event) => {
    //call the updateField function to update the customer state
    updateField(event.target.name, event.target.value);
    //if the field is a phone number, format it
    if (event.target.name === "phone") {
      updateField(event.target.name, formatPhone(event.target.value));
    }
  };

  //function to update or add the customer to the database
  const updateOrAdd = useCallback(async () => {
    try {
      //if the customer has a first name
      if (customer.f_name) {
        //set changed to true if any fields have changed
        let changed = false;
        Object.keys(customer).forEach((key) => {
          if (customer[key] !== props.customer[key]) {
            changed = true;
          }
        });
        //if the customer info has changed
        if (changed) {
          //if the customer already exists in the database
          if (customer.customer_id > 0) {
            //remove the non numbers from the phone number
            customer.phone = customer.phone.replace(digitsOnly, "");
            //update the customer in the database
            await updateCustomer(customer);
          }
          //if the customer does not exist in the database
          else {
            //remove the non numbers from the phone number
            customer.phone = customer.phone.replace(digitsOnly, "");
            //add the customer to the database
            const customerResponse = await addCustomer(customer);
            //set the customer id to the response insert id
            customer.customer_id = customerResponse.insertId;
          }
        }
        //set the date and time for the order to the current date and time
        const currentDateTime = new Date();
        //remove the date from the current date and time
        const scheduledDate = currentDateTime.toISOString().slice(0, 10);
        //remove the time from the current date and time
        const scheduledTime = `${String(currentDateTime.getHours()).padStart(2, "0")}:${String(currentDateTime.getMinutes()).padStart(2, "0")}:00`;
        //set the default info for the new order
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

  //if the user presses enter, update or add the customer
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
          {/* display the customer info fields, excluding the ones in excludeFields */}
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
              /* if the customer first name or phone number is not complete, disable the button */
              customer.f_name.length <= 0 ||
              customer.phone.replace(digitsOnly, "").length !== 10
            }
            /* when the button is clicked, call the updateOrAdd function */
            onClick={updateOrAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerEditPanel;
