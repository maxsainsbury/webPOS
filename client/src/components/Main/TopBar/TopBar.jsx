import './TopBar.css';
import TouchBtn from "../../Universal/TouchBtn/TouchBtn.jsx";
import { useEffect, useState } from "react";
import { appWindow } from '@tauri-apps/api/window';

const TopBar = () => {

    let [fullscreenActive, setFullscreenActive] = useState(false);

    const testFunction = () => {
        console.log("testFunction");
    }

    const toggleFullscreen = async () => {
        setFullscreenActive(!fullscreenActive);
        try {
            await appWindow.maximize();
            await appWindow.setFullscreen(!fullscreenActive);
        } catch (error) {
            console.error("Failed to toggle fullscreen", error);
        }
    }

    const btnNames = [
        {name: 'test1', func: testFunction},
        {name: 'test2', func: testFunction},
        {name: 'test3', func: testFunction},
        {name: 'test4', func: testFunction},
        {name: 'test5', func: testFunction},
        {name: 'test6', func: testFunction},
        {name: 'test7', func: testFunction},
        {name: 'test8', func: testFunction},
        {name: 'test9', func: testFunction},
        {name: 'test10', func: testFunction},
        {name: 'test11', func: testFunction},
        {name: 'Fullscreen', func: toggleFullscreen},];

    return (
        <div id="topbar">
            {btnNames.map(({name, func}, index) => (
                <TouchBtn
                    key={index}
                    name={name}
                    onClick={func}
                    className="rectangle topbarBtn"
                />
            ))}
        </div>
    )
}

export default TopBar