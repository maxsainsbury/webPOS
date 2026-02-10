import './TouchBtn.css';

const TouchBtn = (props) => {

    return (
        <div className={props.className +' btn'} id={props.id} onClick={props.onClick}>
            <p className="btnTitle">{props.name}</p>
        </div>
    );
}

export default TouchBtn;