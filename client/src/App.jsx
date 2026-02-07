import './App.css'
import LoginPanel from "./components/Login/LoginPanel/LoginPanel.jsx";

import { invoke } from "@tauri-apps/api";

function App() {

  return (
    <>
        <LoginPanel width="22em" />
    </>
  )
}

export default App
