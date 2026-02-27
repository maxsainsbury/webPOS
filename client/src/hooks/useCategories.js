import {useEffect, useState} from "react";

export const useCategories = (fetchCategories) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            if (data) {
                setCategories(data);
            }
        }
        loadCategories();
    }, [fetchCategories]);

    return { categories, setCategories };
}