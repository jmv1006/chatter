import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateMessage = (props) => {
  const params = useParams();

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
    fetch(`/chatroom/${params.chatId}/create-message`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify({ text: message.text, userid: props.user.id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        props.emitMessage(message.text);
        setMessage({text: ''})
      })
      .catch((error) => console.log(error));
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
