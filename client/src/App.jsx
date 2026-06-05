import { useState } from "react";
import "./App.css";
import LoginPanel from "./components/LoginPanel.jsx";
import MainPanel from "./components/MainPanel.jsx";
import { useUser } from "./hooks/useUser.js";

function App() {
  //create a variable to store the user info
  const { user, setUser } = useUser();

  //if a user is signed in, show the main panel, otherwise show the login panel
  return (
    <>{user ? <MainPanel user={user} /> : <LoginPanel onLogin={setUser} />}</>
  );
}

export default App;
