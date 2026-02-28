import {useEffect, useState} from "react";

export const useOrderTypes = (initialOrderTypes = []) => {
    const [orderTypes, setOrderTypes] = useState(initialOrderTypes);
    return { orderTypes, setOrderTypes };
}

export const usePendingOrders = (fetchOrders) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const data = await fetchOrders();
            if (data) {
                setOrders(data);
            }
        }
        loadOrders();
    }, [fetchOrders]);

    return {orders, setOrders};
}