import './LoginPanel.css';
import TouchBtn from "./TouchBtn.jsx";
import LoginViewCircle from "./LoginViewCircle.jsx";
import {useState} from "react";
import {login} from "../api/employee.js";

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

    const handleLogin = async () => {
        const user = await login(input);
        if(user) {
            props.onLogin(user);
        }
        else {
            setInput("");
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
                    <TouchBtn name="OK" className="round" onClick={handleLogin} />
                </div>
            </div>
        </div>
    )
}

export default LoginPanel;