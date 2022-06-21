import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./create-message.css";

const CreateMessage = ({ sendServerTyping, user, emitMessage }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState({ text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    sendServerTyping();
    const value = e.target.value;
    setMessage({
      ...message,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const response = await  fetch(`/chatroom/${params.chatId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message.text, userid: user.id }),
    });

    if(!response.ok) {
      if(response.status === 500) {
        navigate('/error')
        return
      }
      setIsLoading(false)
    };

    await response.json();
    setIsLoading(false);
    emitMessage(message.text);
    setMessage({ text: "" });
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
