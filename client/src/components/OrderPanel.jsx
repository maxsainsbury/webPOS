import "./OrderPanel.css";
import { useCategories } from "../hooks/useCategories.js";
import { getCategories } from "../api/categories.js";
import TouchBtn from "./TouchBtn.jsx";
import { useState } from "react";

const OrderPanel = (props) => {
  const { categories, setCategories } = useCategories(getCategories);
  const [currentCategoryId, setCurrentCategoryId] = useState(1);

  return (
    <div id="orderPanel">
      <div id="categories">
        {categories
          .filter((category) =>
            props.items.some(
              (item) => item.category_id === category.category_id,
            ),
          )
          .map((category) => (
            <TouchBtn
              key={category.category_id}
              name={category.category_name}
              className="categoryBtn rectangle"
              onClick={() => setCurrentCategoryId(category.category_id)}
            ></TouchBtn>
          ))}
      </div>
      <div id="order-items">
        {props.items
          .filter((item) => item.category_id === currentCategoryId)
          .sort((a, b) => {
            const nameA = a.item_name.toLowerCase();
            const nameB = b.item_name.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          })
          .map((item) => (
            <TouchBtn
              key={item.item_id}
              name={item.item_name}
              className="itemBtn rectangle"
              disabled={!item.is_available}
              onClick={() => props.modifyOrder(item, "add")}
            />
          ))}
      </div>
    </div>
  );
};

export default OrderPanel;
