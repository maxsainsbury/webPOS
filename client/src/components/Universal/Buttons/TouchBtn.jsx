import './Button.css';

const TouchBtn = (props) => {
    const style = {
        width: props.width,
    }

    return (
        <div className={props.className +' btn'} id={props.id} onClick={props.onClick} style={style}>
            <p className="btnTitle">{props.name}</p>
        </div>
    );
}

export default TouchBtn;