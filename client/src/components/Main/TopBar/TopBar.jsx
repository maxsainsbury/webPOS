import './TopBar.css';
import TouchBtn from "../../Universal/TouchBtn/TouchBtn.jsx";

const TopBar = () => {
    const btnSize = 'auto';
    return (
        <div id="topbar">
            <TouchBtn width={btnSize} className='rectangle topbarBtn' />
        </div>
    )
}

export default TopBar