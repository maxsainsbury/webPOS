import {getApiUrl} from "../config/config.js";

//function to login to the main view
export const login = async (password) => {
    try {
        //fill out the password with 0's at the start
        const paddedPassword = password.padStart(4, "0");
        //send the password to the backend and wait for a response
        const response = await fetch(`${getApiUrl()}/employees/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password: paddedPassword}),
        });
        //parse out the employee data
        if(response.ok) {
            return await response.json();
        }
        else {
            console.log("Login failed");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}