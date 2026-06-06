import { useEffect, useState } from "react";

//function to fetch categories from the server
export const useCategories = (fetchCategories) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      if (data) {
        setCategories(data);
      }
    };
    loadCategories();
  }, [fetchCategories]);

  return { categories, setCategories };
};
