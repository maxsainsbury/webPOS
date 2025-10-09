import './Button.css';

const TouchBtn = (props) => {
    const style = {
        width: props.width,
        height: props.height,
    }

    return (
        <div className="btn" id={props.id} style={style}>
            <p className="btnTitle">{props.name}</p>
        </div>
    );
}

export default TouchBtn;