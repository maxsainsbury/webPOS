import './LoginPanel.css';
import TouchBtn from "../Buttons/TouchBtn.jsx";
import LoginViewCircle from "../loginViewCircles/loginViewCircle.jsx";
import {useState} from "react";

const LoginPanel = (props) => {
    const style = {
        width: props.width,
        height: props.height,
    }

    let [input, setInput] = useState('');

    const btnSize = "90%";


    const addToInput = (event) => {
        if(input.length < 4) {
            setInput(input + event.target.innerText);
        }
    }

    const removeFromInput = () => {
        setInput(input.substring(0, input.length - 1));
    }

    const login = () => {

    }

    return (
        <div id="loginPanel" style={style}>
            <div id="inputSection">
                <LoginViewCircle className="dark" isActive={false} />
                <LoginViewCircle className="dark" isActice={false} />
                <LoginViewCircle className="dark" isActive={false} />
                <LoginViewCircle className="dark" isActive={false} />
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
            <p>{input}</p>
        </div>
    )
}

export default LoginPanel;