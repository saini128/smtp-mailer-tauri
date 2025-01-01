import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Header from "../components/Header";
// import { useNavigate } from "react-router-dom"; // Import useNavigate


function HomePage() {
    const [from, setFrom] = useState("support@ccstiet.com");
    const [to, setTo] = useState("hushrajs@gmail.com");
    const [cc, setCc] = useState("saini.hck@gmail.com");
    const [subject, setSubject] = useState("Thsi is a test emailer from rust");
    const [message, setMessage] = useState("Test message successfully sent from rust");
    // const navigate = useNavigate(); // Initialize useNavigate

    async function sendEmail() {
        const response = await invoke("send_email", {
            from,
            to,
            cc,
            subject,
            message,
        });
        alert(response);
    }

    async function logout() {
        const response = await invoke("delete_smtp_credentials");
        alert(response);
        window.location.reload();
    }

    return (
        <>

            <Header />
            <main className="container">
                <h1>Compose Email</h1>
                <form onSubmit={(e) => { e.preventDefault(); sendEmail(); }}>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="From"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="To"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="CC"
                            value={cc}
                            onChange={(e) => setCc(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="message-container">
                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <button type="submit">Send</button>
                </form>
                <div className="input-container">
                    <button onClick={logout}>Logout</button>
                </div>

            </main>
        </>
    );
}

export default HomePage;
