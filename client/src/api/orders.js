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
