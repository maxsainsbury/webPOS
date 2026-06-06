import "./LoginViewCircles.css";

const LoginViewCircle = (props) => {
  //create a component that has a default class of viewCircle
  return <div className={props.className + " viewCircle"}></div>;
};

export default LoginViewCircle;
