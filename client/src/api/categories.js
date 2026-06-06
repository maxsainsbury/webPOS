import { getApiUrl } from "../config/config.js";

//function to fetch the categories from the API
export const getCategories = async () => {
  try {
    const response = await fetch(`${getApiUrl()}/categories`, {
      method: "GET",
      headers: {},
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.log("Error fetching categories");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
