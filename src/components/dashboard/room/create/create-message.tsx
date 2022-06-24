import { useState } from "react";
import { useParams } from "react-router";
import { UserInterface } from "../../../../shared/interfaces/interfaces";
import './create-message.css';

type CreateMessageProps = {
    user: UserInterface,
    sendServerTyping: () => void,
    emitMessage: (text: string) => void;
};

const CreateMessage = ({ user, sendServerTyping, emitMessage }: CreateMessageProps) => {
    const params = useParams();

    const [text, setText] = useState("");

    const handleChange = (e: any) => {
        sendServerTyping();
        setText(text => e.target.value)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const response = await fetch(`/chatroom/${params.chatId}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text, userid: user.id }),
        });
      
        if(!response.ok) {
            //error posting
        };
    
        await response.json();

        emitMessage(text);
        setText(text => "");
    };

    return(
        <div className="createMessageContainer">
            <form onSubmit={handleSubmit} className="createMessageForm">
                <input className="messageInput" type="text" placeholder="Message Here" value={text} onChange={handleChange} required/>
                <button className="messageSubmitBtn" type="submit">Send</button>
            </form>
        </div>
    )
}

export default CreateMessage;