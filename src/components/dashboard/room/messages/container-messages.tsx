import { useEffect, useState } from "react"
import Message from './message';

interface IMessages {
    Text: string, 
    Id: string,
    Time: string,
    UserId: string,
    Chatroom: string
};

const MessagesContainer = ({ messagesAndAmount, fetchMoreMessages } : any) => {

    const [messages, setMessages] = useState<Array <IMessages>>([]);
    const [messagesAmount, setMessagesAmount] = useState(0);

    useEffect(() => {
        setMessages(messages => messagesAndAmount.messages);
        setMessagesAmount(messagesAmount => messagesAndAmount.messagesAmount)
    }, [messagesAndAmount]);

    const mappedMessages = messages.map((message) => 
        <Message key={message.Id} message={message}/>
    )

    return(
        <div className="messagesContainer">
            {messagesAmount > messages.length ? <button onClick={fetchMoreMessages}>Fetch More</button> : null}
            {mappedMessages}
        </div>
    )
}

export default MessagesContainer;