import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Form from "../components/Form";
import Header from "../components/Header";

function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");

  async function storeSMTPcredentials() {
    const response = await invoke("store_smtp_credentials", {
      username,
      password,
      host,
      port,
    });
    console.log(username);
    setErrorMsg(response);

    // If credentials are stored successfully, navigate to homepage after 2 seconds
    if (response === "SMTP credentials stored successfully") {
      setTimeout(() => {
        window.location.reload(); // Redirect to the homepage
      }, 2000); // 2-second delay
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !host || !port) {
      alert("All fields are required!");
      return;
    }
    storeSMTPcredentials();
  };

  return (
    <main className="container-login">
      <img src="background.jpg" alt="email" />
      <div className="right-login">
        <Header />
        <h1>Welcome to SinghRopar Mailer</h1>
        <p>Enter your SMTP Credentials to proceed.</p>
        <div className="form-login">
          <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            host={host}
            setHost={setHost}
            port={port}
            setPort={setPort}
            handleSubmit={handleSubmit}
          />
        </div>
        <p>{errorMsg}</p>
      </div>
    </main>
  );
}

export default LoginPage;
