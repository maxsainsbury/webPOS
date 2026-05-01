import {getApiUrl} from "../config/config.js";

export const getItems = async () => {
    try {
        const response = await fetch(`${getApiUrl()}/items`, {
            method: "GET",
            headers: {}
        });
        if(response.ok) {
            return await response.json();
        }
        else {
            console.log("Error fetching items");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getItemsForOrder = async (orderId) => {
    try {
        const response = await fetch(`${getApiUrl()}/order/items/${orderId}`, {
            method: "GET",
            headers: {}
        });
        if(response.ok) {
            return await response.json();
        }
        else {
            console.log("Error fetching items");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}