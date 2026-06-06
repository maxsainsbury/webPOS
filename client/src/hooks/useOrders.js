import { useEffect, useState } from "react";

//state variable to store the current order types in the front end
export const useOrderTypes = (initialOrderTypes = []) => {
  const [orderTypes, setOrderTypes] = useState(initialOrderTypes);
  return { orderTypes, setOrderTypes };
};

//state variable to store and load the pending orders in the front end
export const usePendingOrders = (fetchOrders) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      if (data) {
        setOrders(data);
      }
    };
    loadOrders();
  }, [fetchOrders]);

  return { orders, setOrders };
};
