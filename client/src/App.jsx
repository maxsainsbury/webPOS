import { useEffect } from "react";
import { appWindow } from '@tauri-apps/api/window';
import './App.css'
import LoginPanel from "./components/Login/LoginPanel/LoginPanel.jsx";

function App() {

    useEffect(() => {
        appWindow.maximize();
    }, []);

  return (
    <>
        <LoginPanel width="22em" />
    </>
  )
}

export default App
