import './SideBar.css';
import {useOrderTypes} from "../hooks/useOrders.js";
import {getOrderTypes} from "../api/orders.js";
import TouchBtn from "./TouchBtn.jsx";
import {useEffect} from "react";

const SideBar = (props) => {
    const { orderTypes, setOrderTypes } = useOrderTypes();
    let selectedItem = {}
    useEffect(() => {
        getOrderTypes().then(setOrderTypes);
    }, [setOrderTypes]);

    return (
        <div id="sideBar">
            {
                (props.activeView === 'dashboard') ? orderTypes.map((orderType, index) => (
                    <TouchBtn
                        key={index}
                        name={orderType}
                        className="rectangle sidebarBtn"
                        onClick={() => {
                            if (orderType === "Delivery" || orderType === "Pickup") {
                                props.setOrderType(orderType);
                                props.onOrder(true)
                            }
                            else {
                                props.onOrder(false)
                            }
                        }}
                    />
                )) : null
            }
            {
                (props.activeView === 'order') ?
                    <div id="orderSidebar">
                        <div id="orderInfo">
                            <div id="sidebar-items">
                                {props.modifiedOrder.items?.map((item, index) => (
                                    <div key={index} className="item">
                                        <p>{item.item_name}</p>
                                        <p>{item.item_price}</p>
                                    </div>
                                ))}
                            </div>
                            <div id="paymentInfo">
                                <div id="subtotal" className="paymentGroup">
                                    <p id="subtotalName">Subtotal: </p>
                                    <p id="subtotalValue">{props.order.subtotal ? new Intl.NumberFormat('en-CA', {style: "currency", currency: "CAD" }).format(props.order.subtotal) : "$0.00"}</p>
                                </div>
                                <div id="tax" className="paymentGroup">
                                    <p id="taxName">Tax: </p>
                                    <p id="taxValue">{props.order.tax_amount ? new Intl.NumberFormat('en-CA', {style: "currency", currency: "CAD" }).format(props.order.tax_amount) : "$0.00"}</p>
                                </div>
                                <div id="total" className="paymentGroup">
                                    <p id="totalName">Total: </p>
                                    <p id="totalValue">{props.order.subtotal || props.order.tax_amount ? new Intl.NumberFormat('en-CA', {style: "currency", currency: "CAD" }).format(parseInt(props.order.subtotal) + parseInt(props.order.tax_amount)) : "$0.00"}</p>
                                </div>
                            </div>
                        </div>
                        <div id="orderBtns">
                            <TouchBtn name="Modify" className="rectangle sidebarBtn" />
                            <TouchBtn name="Delete" className="rectangle sidebarBtn" onClick={() => props.modifyOrder(selectedItem, 'delete')} />
                            <TouchBtn name="Payment" className="rectangle sidebarBtn" />
                            <TouchBtn name="Save" className="rectangle sidebarBtn" onClick={() => props.saveOrder(props.modifiedOrder)} />
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default SideBar