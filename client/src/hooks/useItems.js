import {useEffect, useState} from "react";

export const useItems = (fetchItems) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems();
            if (data) {
                setItems(data);
            }
        }
        loadItems();
    }, [fetchItems]);

    return {items, setItems};
}

export const useItemsForOrder = (fetchItems) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems();
            if (data) {
                setItems(data);
            }
        }
        loadItems();
    }, [fetchItems]);

    return {items, setItems};
}