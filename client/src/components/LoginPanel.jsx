import "./LoginPanel.css";
import TouchBtn from "./TouchBtn.jsx";
import LoginViewCircle from "./LoginViewCircle.jsx";
import { useEffect, useState } from "react";
import { login } from "../api/employee.js";

const LoginPanel = (props) => {
  //variable to store the inputed password
  let [input, setInput] = useState("");
  //function to add a value to the end of the input variable
  const addToInput = (value) => {
    //keep the variable to a max of 4 digits
    if (input.length < 4) {
      //add the text of the button to the end of the variable
      setInput(input + value);
    }
  };

  //function to remove a digit from the end of the input variable
  const removeFromInput = () => {
    //set the input variable to the previous string minus the last digit
    setInput(input.substring(0, input.length - 1));
  };

  //function to handle the login process
  const handleLogin = async () => {
    //get the user associated with the inputed password
    const user = await login(input);
    //if the user is found
    if (user) {
      //login the user
      props.onLogin(user);
    }
    //if the user is not found
    else {
      //clear the input variable
      setInput("");
    }
  };

  //function to handle key down events
  useEffect(() => {
    const handleKeyDown = (e) => {
      //if the key is a number, add it to the input variable
      if (e.key >= 0 && e.key <= 9) {
        addToInput(e.key);
      }
      //if the key is backspace, remove the last digit from the input variable
      else if (e.key === "Backspace") {
        removeFromInput();
      }
      //if the key is enter, handle the login process
      else if (e.key === "Enter") {
        handleLogin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleLogin]);

  return (
    <div id="loginBox">
      <div id="loginPanel">
        <div id="inputSection">
          {/* render circles that represent the inputed password */}
          {[4, 3, 2, 1].map((num) => (
            <LoginViewCircle
              key={num}
              className={input.length >= num ? "light" : "dark"}
            />
          ))}
        </div>
        <div id="btnSection">
          {/* render buttons for digits 1-9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchBtn
              key={num}
              name={num.toString()}
              className="round"
              onClick={() => addToInput(num.toString())}
            />
          ))}
          {/* render buttons for digits backspace */}
          <TouchBtn name="Back" className="round" onClick={removeFromInput} />
          {/* render buttons for digit 0 */}
          <TouchBtn
            name="0"
            className="round"
            onClick={() => addToInput("0")}
          />
          {/* render buttons to search the password */}
          <TouchBtn name="OK" className="round" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
