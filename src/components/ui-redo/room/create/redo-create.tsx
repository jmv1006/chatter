import { useState } from "react";
import { useParams } from "react-router";
import { UserInterface } from "../../../../shared/interfaces/interfaces";

type RedoCreateMessageProps = {
    user: UserInterface,
    sendServerTyping: () => void,
    emitMessage: (text: string) => void;
};

const RedoCreateMessage = ({ user, sendServerTyping, emitMessage }: RedoCreateMessageProps) => {
    const params = useParams();

    const [text, setText] = useState("");

    const handleChange = (e: any) => {
        sendServerTyping();
        setText(text => e.target.value)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const response = await  fetch(`/chatroom/${params.chatId}`, {
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
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Message Here" value={text} onChange={handleChange} required/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default RedoCreateMessage;