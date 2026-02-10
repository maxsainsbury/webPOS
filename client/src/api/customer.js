import { getApiUrl } from "../config/config.js";

export const getCustomerByPhone = async (phoneNumber) => {
    try {
        const response = await fetch(`${getApiUrl()}/customers/phone/${phoneNumber}`, {
            method: "GET",
            headers: {}
        });
        if(response.ok) {
            return await response.json();
        }
        else {
            console.log("Error getting customer");
            return null;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}