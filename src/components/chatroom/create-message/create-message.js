import { useState } from "react";

const CreateMessage = (props) => {
  const [message, setMessage] = useState({ text: "" });

  const handleChange = (e) => {
    props.sendServerTyping();
    const value = e.target.value;
    setMessage({
      ...message,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.emitMessage(message.text);
  };

  return (
    <div>
      {props.isTyping ? "Typing..." : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message Here..."
          name="text"
          value={message.text}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CreateMessage;
