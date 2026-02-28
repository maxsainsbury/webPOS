import './CustomerEditPanel.css';
import {useCustomer} from "../hooks/useCustomer.js";
import TouchBtn from "./TouchBtn.jsx";
import {formatPhone} from "../helpers/helperFunctions.js";
import {addCustomer, updateCustomer} from "../api/customer.js";
import {digitsOnly} from "../helpers/regex.js";

const CustomerEditPanel = (props) => {

    const {customer, setCustomer, updateField} = useCustomer(props.customer);
    const excludeFields = ['customer_id', 'created_at', 'updated_at', 'credit'];
    const fieldLabels = {
        f_name: 'First Name',
        l_name: 'Last Name',
        phone: 'Phone',
        email: 'Email',
        address_line1: 'Address Line 1',
        address_line2: 'Address Line 2',
        city: 'City',
        provence: 'Provence',
        postal_code: 'Postal Code',
        delivery_instructions: 'Delivery Instructions'
    }

    const handleChange = (event) => {
        updateField(event.target.name, event.target.value);
        if(event.target.name === "phone") {
            updateField(event.target.name, formatPhone(event.target.value));
        }
    }

    const updateOrAdd = async () => {
        try {
            if(customer.f_name) {
                let changed = false;
                Object.keys(customer).forEach((key) => {
                    if(customer[key] !== props.customer[key]) {
                        changed = true;
                    }
                });
                if(changed) {
                    if(customer.customer_id > 0) {
                        updateCustomer(customer);
                    }
                    else {
                        addCustomer(customer);
                    }
                }
                props.onNext(customer);
            }
        }
        catch(error) {
            console.log(error.message);
        }
    }

    return (
        <div id="darkenBackground">
            <div id="customerInfo">
                <form id="customerForm">
                    {Object.keys(customer)
                        .filter(key => !excludeFields.includes(key))
                        .map((key) => (
                        <div className="inputPair" key={key}>
                            <label htmlFor={key}>{fieldLabels[key]}:</label>
                            <input id={key} type="text" name={key} value={customer[key] || ''} onChange={handleChange} />
                        </div>
                        ))}
                    <TouchBtn
                        id="customerEditBtn"
                        name="Next"
                        className="rectangle"
                        disabled={customer.f_name.length <= 0 || customer.phone.replace(digitsOnly, '').length !== 10}
                        onClick={updateOrAdd} />
                </form>
            </div>
        </div>
    )
}

export default CustomerEditPanel;