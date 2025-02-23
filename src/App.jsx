import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import TextFormatter from "./pages/TextFormatter";

function App() {
  const [credentialsAvailable, setCredentialsAvailable] = useState(false);

  // Check if credentials are stored at the start
  useEffect(() => {
    async function checkCredentials() {
      const response = await invoke("get_smtp_credentials");
      console.log(response);
      if (response === null) {
        setCredentialsAvailable(false);
        console.log("true");
      } else {
        setCredentialsAvailable(true);
      }
      console.log(credentialsAvailable);
    }

    checkCredentials();
  }, []);

  return <div>
    {!credentialsAvailable ? <NewPage /> : <LoginPage />}
    {/* <NewPage/> */}
    </div>
}

export default App;
