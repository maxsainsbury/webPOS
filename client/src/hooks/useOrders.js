import {useState} from "react";

export const useOrderTypes = () => {
    const [orderTypes, setOrderTypes] = useState([]);
    return { orderTypes, setOrderTypes };
}

export const usePendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    return { pendingOrders, setPendingOrders };
}