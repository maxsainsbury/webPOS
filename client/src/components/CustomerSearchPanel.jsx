import "./CustomerSearchPanel.css";
import { useEffect, useState } from "react";
import TouchBtn from "./TouchBtn.jsx";
import { getCustomerByPhone } from "../api/customer.js";
import { formatPhone } from "../helpers/helperFunctions.js";
import { digitsOnly } from "../helpers/regex.js";

const CustomerSearchPanel = (props) => {
  //create a variable to store the phone number
  const [phone, setPhone] = useState("");

  //if the phone number field changes, format the field
  const handleChange = (event) => {
    setPhone(formatPhone(event.target.value));
  };

  //function to search for a customer by phone number
  const searchCustomers = async () => {
    //remove non-digit characters from the phone number and search the database
    let customer = await getCustomerByPhone(phone.replace(digitsOnly, ""));
    //if there is no customer, create a default customer object
    if (!customer) {
      customer = {
        customer_id: 0,
        f_name: "",
        l_name: "",
        phone: phone,
        email: "",
        address_line1: "",
        address_line2: "",
        city: "",
        provence: "",
        postal_code: "",
        delivery_instructions: "",
      };
    }
    //pass the customer object to the parent component
    props.onSearch(customer);
  };

  //if the user presses enter, search for the customer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        searchCustomers();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchCustomers]);

  return (
    <div id="darkenBackground">
      <div id="customerSearchPanel">
        <div id="searchBox">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            placeholder="(   )   -    "
            value={phone}
            onChange={handleChange}
          />
        </div>
        <TouchBtn
          id="phoneSearchBtn"
          name="Search"
          className="rectangle"
          /* disable the search button if the phone number is not complete */
          disabled={phone.replace(digitsOnly, "").length !== 10}
          onClick={searchCustomers}
        />
      </div>
    </div>
  );
};

export default CustomerSearchPanel;
