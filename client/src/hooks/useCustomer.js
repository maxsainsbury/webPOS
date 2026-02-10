import {useState} from "react";

export const useCustomer = () => {
    const [customer, setCustomer] = useState([]);
    return { customer, setCustomer };
}