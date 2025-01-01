import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Header from "../components/Header";

function HomePage() {
    const [fromName, setFromName] = useState("CCS");
    const [fromEmail, setFromEmail] = useState("support@ccstiet.com");
    const [to, setTo] = useState("hushrajs@gmail.com, saini.hck@gmail.com");
    const [cc, setCc] = useState("example1@gmail.com, example2@gmail.com");
    const [subject, setSubject] = useState("This is a test emailer from Rust");
    const [message, setMessage] = useState("Test message successfully sent from Rust");

    const sanitizeEmails = (emailString) => {
        return emailString
            .split(",") // Split by comma
            .map(email => email.trim()) // Remove surrounding spaces
            .filter(email => email !== ""); // Remove empty entries
    };

    async function sendEmail() {
        const from = `${fromName}<${fromEmail}>`;
        const toList = sanitizeEmails(to);
        const ccList = sanitizeEmails(cc);

        const response = await invoke("send_email", {
            from,
            to: toList.join(", "), // Join emails back for passing as a single string
            cc: ccList.join(", "),
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
                            type="text"
                            placeholder="From Name"
                            value={fromName}
                            onChange={(e) => setFromName(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="From Email"
                            value={fromEmail}
                            onChange={(e) => setFromEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="To (comma-separated)"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="CC (comma-separated)"
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
