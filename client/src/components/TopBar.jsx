import "./TopBar.css";
import { useState } from "react";
import TouchBtn from "./TouchBtn.jsx";
import { getCurrentWindow } from "@tauri-apps/api/window";
const appWindow = getCurrentWindow();

const TopBar = () => {
  //variable to store whether the fullscreen mode is active
  let [fullscreenActive, setFullscreenActive] = useState(false);

  const testFunction = () => {
    console.log("testFunction");
  };
  //function to toggle fullscreen mode
  const toggleFullscreen = async () => {
    //set fullscreenActive to the opposite of its current value
    setFullscreenActive(!fullscreenActive);
    try {
      //maximaze the tauri window
      await appWindow.maximize();
      //set the fullscreen state to the opposite of the fullscreeActive variable
      await appWindow.setFullscreen(!fullscreenActive);
    } catch (error) {
      console.error("Failed to toggle fullscreen", error);
    }
  };

  //array of the buttons in the top bar
  const btnNames = [
    { name: "test1", func: testFunction },
    { name: "test2", func: testFunction },
    { name: "test3", func: testFunction },
    { name: "test4", func: testFunction },
    { name: "test5", func: testFunction },
    { name: "test6", func: testFunction },
    { name: "test7", func: testFunction },
    { name: "test8", func: testFunction },
    { name: "test9", func: testFunction },
    { name: "test10", func: testFunction },
    { name: "test11", func: testFunction },
    { name: "Fullscreen", func: toggleFullscreen },
  ];

  return (
    <div id="topbar">
      {/* display the buttons in the top bar */}
      {btnNames.map(({ name, func }, index) => (
        <TouchBtn
          key={index}
          name={name}
          onClick={func}
          className="rectangle topbarBtn"
        />
      ))}
    </div>
  );
};

export default TopBar;
