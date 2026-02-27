import {useEffect, useState} from "react";

export const useCustomer = (initialCustomer = null) => {
    const [customer, setCustomer] = useState(initialCustomer);

    const updateField = (field, value) => {
        setCustomer(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const updateCustomer = (data) => {
        setCustomer(data);
    }

    return { customer, setCustomer, updateField, updateCustomer };
}
