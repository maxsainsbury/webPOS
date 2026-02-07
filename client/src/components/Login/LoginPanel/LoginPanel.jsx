import './LoginPanel.css';
import TouchBtn from "../../Universal/Buttons/TouchBtn.jsx";
import LoginViewCircle from "../loginViewCircles/LoginViewCircle.jsx";
import {useState} from "react";

const LoginPanel = (props) => {
    const style = {
        width: props.width,
        height: props.height,
    }

    const btnSize = "90%";
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
            const password = input.padStart(4, "0");
            console.log(password);
            const response = await fetch('/api/employees/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password: password}),
            });
            const data = await response.json();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id="loginPanel" style={style}>
            <div id="inputSection">
                <LoginViewCircle className={input.length >= 4 ? "light" : "dark"} />
                <LoginViewCircle className={input.length >= 3 ? "light" : "dark"} />
                <LoginViewCircle className={input.length >= 2 ? "light" : "dark"} />
                <LoginViewCircle className={input.length >= 1 ? "light" : "dark"} />
            </div>
            <div id="btnSection">
                <TouchBtn name="1" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="2" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="3" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="4" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="5" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="6" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="7" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="8" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="9" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="Back" className="round" width={btnSize} onClick={removeFromInput} />
                <TouchBtn name="0" className="round" width={btnSize} onClick={addToInput} />
                <TouchBtn name="OK" className="round" width={btnSize} onClick={login} />
            </div>
        </div>
    )
}

export default LoginPanel;