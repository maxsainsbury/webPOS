import './CustomerSearchPanel.css'
import {useState} from "react";
import TouchBtn from "./TouchBtn.jsx";
import {getCustomerByPhone} from "../api/customer.js";

const CustomerSearchPanel = (props) => {
    const [phone, setPhone] = useState('');
    const [isDisabled, setDisabled] = useState(true);

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length === 10) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
        if (digits.length < 3) {
            return digits;
        }
        else if (digits.length <= 6) {
            return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
        }
        else {
            return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
        }
    }

    const handleChange = (event) => {
        setPhone(formatPhone(event.target.value));
    }

    const searchCustomers = async () => {
        const customer = await getCustomerByPhone(phone.replace(/\D/g, ''));
        props.onSearch(customer);
    }

    return (
        <div id="darkenBackground">
            <div id="customerSearchPanel">
                <form>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" id="phone" placeholder="(   )   -    " value={phone} onChange={handleChange}/>
                </form>
                <TouchBtn id="phoneSearchBtn" name="Search" className="rectangle" style={{pointerEvents: isDisabled ? 'none' : 'auto', opacity: isDisabled ? 0.6 : 1}} onClick={searchCustomers} />
            </div>
        </div>
    )
}

export default CustomerSearchPanel;