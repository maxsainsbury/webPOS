import './touchBtn.css';

const TouchBtn = (props) => {
    const style = {
        width: props.width,
        height: props.height,
    }

    return (
        <div className="touchBtn" style={style}>
            <p className="touchBtnTitle">{props.name}</p>
        </div>
    );
}

export default TouchBtn;