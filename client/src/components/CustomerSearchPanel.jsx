import './CustomerSearchPanel.css'
import {useState} from "react";
import TouchBtn from "./TouchBtn.jsx";
import {getCustomerByPhone} from "../api/customer.js";
import {formatPhone} from "../helpers/helperFunctions.js";
import {digitsOnly} from "../helpers/regex.js";

const CustomerSearchPanel = (props) => {
    const [phone, setPhone] = useState('');
    const [isDisabled, setDisabled] = useState(true);

    const handleChange = (event) => {
        setPhone(formatPhone(event.target.value));
        const digits = event.target.value.replace(digitsOnly, '');
        setDisabled(digits.length !== 10);
    }

    const searchCustomers = async () => {
        let customer = await getCustomerByPhone(phone.replace(digitsOnly, ''));
        if(!customer) {
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
                delivery_instructions: ""
            }
        }
        props.onSearch(customer);
    }

    return (
        <div id="darkenBackground">
            <div id="customerSearchPanel">
                <form>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" id="phone" placeholder="(   )   -    " value={phone} onChange={handleChange}/>
                </form>
                <TouchBtn
                    id="phoneSearchBtn"
                    name="Search"
                    className="rectangle"
                    disabled={phone.replace(digitsOnly, '').length !== 10}
                    onClick={searchCustomers} />
            </div>
        </div>
    )
}

export default CustomerSearchPanel;