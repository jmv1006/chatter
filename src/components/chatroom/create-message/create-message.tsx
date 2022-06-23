import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserInterface } from "../../../shared/interfaces/interfaces";
import "./create-message.css";
interface IMessage {
  text: string
}

type CreateMessagePropTypes = {
  sendServerTyping: () => void,
  user: UserInterface,
  emitMessage: (text: string) => void
}

const CreateMessage = ({ sendServerTyping, user, emitMessage } : CreateMessagePropTypes) => {
  const params = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState<IMessage >({ text: "" });
  const [isLoading, setIsLoading] = useState<boolean >(false);

  const handleChange = (e: any) => {
    sendServerTyping();
    const value = e.target.value;
    setMessage({
      ...message,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(isLoading => true);
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
      setIsLoading(isLoading => false);
    };

    await response.json();
    setIsLoading(isLoading => false);
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
