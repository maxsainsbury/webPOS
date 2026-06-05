import { getApiUrl } from "../config/config.js";

//function to fetch a customer by phone number from the API
export const getCustomerByPhone = async (phoneNumber) => {
  try {
    const response = await fetch(
      `${getApiUrl()}/customers/phone/${phoneNumber}`,
      {
        method: "GET",
        headers: {},
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      console.log("Error getting customer");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

//function to fetch a customer by ID from the API
export const getCustomerById = async (customerId) => {
  try {
    customerId = Array.isArray(customerId) ? customerId : [customerId];
    let output = [];
    for (let i = 0; i < customerId.length; i++) {
      const response = await fetch(
        `${getApiUrl()}/customers/${customerId[i]}`,
        {
          method: "GET",
          headers: {},
        },
      );
      if (response.ok) {
        output.push(await response.json());
      } else {
        console.log("Error getting customer");
      }
    }
    if (output.length > 0) {
      return output;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//function to update a customer in the API
export const updateCustomer = async (customer) => {
  try {
    const response = await fetch(`${getApiUrl()}/customers/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//function to add a customer to the API
export const addCustomer = async (customer) => {
  try {
    const response = await fetch(`${getApiUrl()}/customers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.insertId);
      return data;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
