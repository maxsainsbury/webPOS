import { useEffect, useState } from "react";

//state variable to store and load multiple items data in the front end
export const useItems = (fetchItems) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems();
      if (data) {
        setItems(data);
      }
    };
    loadItems();
  }, [fetchItems]);

  return { items, setItems };
};
