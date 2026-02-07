import './LoginPanel.css';
import TouchBtn from "../../Universal/TouchBtn/TouchBtn.jsx";
import LoginViewCircle from "../loginViewCircles/LoginViewCircle.jsx";
import {useState} from "react";

const LoginPanel = (props) => {

    let [input, setInput] = useState('');

    //function to add a value to the end of the input variable
    const addToInput = (event) => {
        //keep the variable to a max of 4 digits
        if(input.length < 4) {
            //add the text of the button to the end of the variable
            setInput(input + event.target.innerText);
        }
    }

    //function to remove a digit from the end of the input variable
    const removeFromInput = () => {
        //set the input variable to the previous string minus the last digit
        setInput(input.substring(0, input.length - 1));
    }

    //function to login to the main view
    const login = async () => {
        try {
            //fill out the password with 0's at the start
            const password = input.padStart(4, "0");
            //send the password to the backend and wait for a response
            const response = await fetch('/api/employees/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password: password}),
            });
            //parse out the employee data
            if(response.ok) {
                const data = await response.json();
                props.onLogin(data);
            }
            else {
                console.log("Login failed");
                setInput('');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id="loginBox">
            <div id="loginPanel">
                <div id="inputSection">
                    {[4, 3, 2, 1].map(num => (
                        <LoginViewCircle
                            key={num}
                            className={input.length >= num ? "light" : "dark"}
                        />
                    ))}
                </div>
                <div id="btnSection">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <TouchBtn
                            key={num}
                            name={num.toString()}
                            className="round"
                            onClick={addToInput}
                        />
                    ))}
                    <TouchBtn name="Back" className="round" onClick={removeFromInput} />
                    <TouchBtn name="0" className="round" onClick={addToInput} />
                    <TouchBtn name="OK" className="round" onClick={login} />
                </div>
            </div>
        </div>
    )
}

export default LoginPanel;