import { useEffect, useState } from "react";
import { appWindow } from '@tauri-apps/api/window';
import './App.css'
import LoginPanel from "./components/Login/LoginPanel/LoginPanel.jsx";
import MainPanel from "./components/Main/MainPanel/MainPanel.jsx";

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        appWindow.maximize();
    }, []);

  return (
    <>
        {user ? (
            <MainPanel user={user} />
        ) : (
            <LoginPanel onLogin={setUser} />
        )}
    </>
  )
}

export default App
