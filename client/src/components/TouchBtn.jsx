import './TouchBtn.css';

const TouchBtn = (props) => {

    return (
        <div className={`${props.className} btn ${props.disabled ? 'disabled' : ''}`} id={props.id} onClick={props.disabled ? null : props.onClick}>
            <p className="btnTitle">{props.name}</p>
        </div>
    );
}

export default TouchBtn;