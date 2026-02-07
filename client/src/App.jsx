import {useState} from "react";
import './App.css'
import LoginPanel from "./components/Login/LoginPanel/LoginPanel.jsx";
import MainPanel from "./components/Main/MainPanel/MainPanel.jsx";

import {getTauriVersion} from '@tauri-apps/api/app';

function App() {

    const [user, setUser] = useState(null);

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
