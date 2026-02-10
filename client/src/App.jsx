import {useState} from "react";
import './App.css'
import LoginPanel from "./components/LoginPanel.jsx";
import MainPanel from "./components/MainPanel.jsx";
import {useUser} from "./hooks/useUser.js";

function App() {
  const { user, setUser } = useUser();

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
