import {getApiUrl} from "../config/config.js";

export const getOrderTypes = async () => {
    try {
        const response = await fetch(`${getApiUrl()}/order/types`, {
            method: "GET",
            headers: {}
        });
        if(response.ok) {
            let data = await response.json();
            data = data[0].COLUMN_TYPE.replace(/^enum\('/g, "");
            data = data.replace(/'\)$/g, "");
            return data.split("','")
        }
        else {
            console.log("Error fetching order types");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByPaymentStatus = async (paymentStatus) => {
    try {
        const response = await fetch(`${getApiUrl()}/orders/payment/${paymentStatus}`, {
            method: "GET",
            headers: {}
        });
        if(response.ok) {
            return await response.json();
        }
        else {
            console.log("Error fetching orders by payment status");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrderById = async (orderId) => {
    try {
        const response = await fetch(`${getApiUrl()}/orders/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderId)
        });
        if(response.ok) {
            return await response.json();
        }
        else {
            console.log("Error fetching orders by order id");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateInUse = async (order) => {
    try {
        const response = await fetch(`${getApiUrl()}/order/update/inuse`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({order_id: order.order_id, in_use: order.in_use})
        });
        if(response.ok) {
            return true;
        }
        else {
            console.log("Error updating in use status");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
