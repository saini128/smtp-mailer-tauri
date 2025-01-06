import React from "react";
import InputField from "./InputField";

function Form({
  username,
  setUsername,
  password,
  setPassword,
  host,
  setHost,
  port,
  setPort,
  handleSubmit,
}) {
  return (
    <form className="column" onSubmit={handleSubmit}>
      <InputField
        label="SMTP Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="SMTP Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label="SMTP Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
      />
      <InputField
        label="SMTP Port"
        value={port}
        onChange={(e) => setPort(e.target.value)}
      />
      <div className="input-container-submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Form;
