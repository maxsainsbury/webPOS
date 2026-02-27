import {useEffect, useState} from "react";

export const useOrderTypes = (initialOrderTypes = []) => {
    const [orderTypes, setOrderTypes] = useState(initialOrderTypes);
    return { orderTypes, setOrderTypes };
}

export const usePendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    return { pendingOrders, setPendingOrders };
}