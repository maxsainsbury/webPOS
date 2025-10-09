import './LoginPanel.css';
import TouchBtn from "../Buttons/TouchBtn.jsx";

const LoginPanel = (props) => {
    const style = {
        width: props.width,
        height: props.height,
    }
    console.log(props.width)
    const btnSize = props.width / 3;
    console.log("btnSize", btnSize)

    return (
        <div className="loginPanel" style={style}>
            <div className="inputSection">

            </div>
            <div className="btnSection">
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
                <TouchBtn name="1" id="round" width={btnSize} height={btnSize} />
            </div>
        </div>
    )
}

export default LoginPanel;