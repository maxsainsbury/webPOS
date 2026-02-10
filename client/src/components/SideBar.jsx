import './SideBar.css';
import {useOrderTypes} from "../hooks/useOrders.js";
import {getOrderTypes} from "../api/orders.js";
import TouchBtn from "./TouchBtn.jsx";
import {useEffect} from "react";

const SideBar = (props) => {
    const { orderTypes, setOrderTypes } = useOrderTypes();
    useEffect(() => {
        getOrderTypes().then(setOrderTypes);
    }, [setOrderTypes]);

    return (
        <div id="sideBar">
            {
                orderTypes.map((orderType, index) => (
                    <TouchBtn
                        key={index}
                        name={orderType}
                        className="rectangle sidebarBtn"
                        onClick={() => {
                            if (orderType === "Delivery" || orderType === "Pickup") {
                                props.onOrder(true)
                            }
                            else {
                                props.onOrder(false)
                            }
                        }}
                    />
                ))
            }
        </div>
    )
}

export default SideBar