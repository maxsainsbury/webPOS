import {getApiUrl} from "../config/config.js";

export const getItems = async () => {
    try {
        const response = await fetch(`${getApiUrl()}/items`, {
            method: "GET",
            headers: {}
        });
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            return await data;
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