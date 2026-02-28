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

export const getCustomerById  = async (customerId) => {
    try {
        customerId  = Array.isArray(customerId) ? customerId : [customerId];
        let output = []
        for (let i = 0; i < customerId.length; i++) {
            const response = await fetch(`${getApiUrl()}/customers/${customerId[i]}`, {
                method: "GET",
                headers: {}
            });
            if (response.ok) {
                output.push(await response.json());
            } else {
                console.log("Error getting customer");
            }
        }
        if (output.length > 0) {
            return output
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateCustomer = async (customer) => {
    try {
        const response = await fetch(`${getApiUrl()}/customers/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer)
        });
        return response.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const addCustomer = async (customer) => {
    try {
        const response = await fetch(`${getApiUrl()}/customers/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer)
        });
        return response.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
}