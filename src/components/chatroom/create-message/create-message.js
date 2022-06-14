import { useState } from "react";
import { useParams } from "react-router-dom";
import "./create-message.css";

const CreateMessage = (props) => {
  const params = useParams();

  const [message, setMessage] = useState({ text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    props.sendServerTyping();
    const value = e.target.value;
    setMessage({
      ...message,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch(`/chatroom/${params.chatId}/create-message`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message.text, userid: props.user.id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        props.emitMessage(message.text);
        setMessage({ text: "" });
      })
      .catch((error) => {
        if (error.message == "401") {
          //Token expired
          window.location.reload();
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="createMessageContainer">
      <form onSubmit={handleSubmit} className="newMessageForm">
        <input
          className="messageTextInput"
          type="text"
          placeholder="Message Here..."
          name="text"
          value={message.text}
          onChange={handleChange}
          required
        />
        <button type="submit" className="messageSendButton">
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default CreateMessage;
