import './CustomerEditPanel.css';
import {useCustomer} from "../hooks/useCustomer.js";

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
                </form>
            </div>
        </div>
    )
}

export default CustomerEditPanel;