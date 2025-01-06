function InputField({ label, type = "text", value, onChange }) {
  return (
    <div className="input-container-login">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        required
      />
    </div>
  );
}

export default InputField;
