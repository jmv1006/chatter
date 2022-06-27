import { RefObject, useEffect, useState } from "react"
import Message from './message';

interface IMessage {
    Text: string, 
    Id: string,
    Time: string,
    UserId: string,
    Chatroom: string
};

const TypingMessage: IMessage = {
    Text: "Typing...",
    Id: "typing",
    Time: "typing",
    UserId: "typing",
    Chatroom: "typing"
};

interface IMessagesAndAmount {
    messages: Array<IMessage>,
    messagesAmount: number
}

type MessagesContainerProps = {
    messagesAndAmount: null | IMessagesAndAmount,
    incrementPage: () => void,
    isTyping: boolean,
    dummydiv: RefObject<HTMLDivElement>,
    scrollToBottom: () => void
}

const MessagesContainer = ({ messagesAndAmount, incrementPage, isTyping, dummydiv, scrollToBottom } : MessagesContainerProps) => {

    const [messages, setMessages] = useState<Array <IMessage>>([]);
    const [messagesAmount, setMessagesAmount] = useState(0);

    useEffect(() => {
        if(messagesAndAmount) {
            setMessages(messages => messagesAndAmount.messages);
            setMessagesAmount(messagesAmount => messagesAndAmount.messagesAmount)
        }
    }, [messagesAndAmount]);

    const mappedMessages = messages.map((message) => 
        <Message key={message.Id} message={message}/>
    );

    return(
        <div className="messagesContainer">
            {messages.length === 0 && "No Messages!"}
            {messagesAmount > messages.length ? <button onClick={incrementPage}>Load More</button> : null}
            {mappedMessages}
            {isTyping && <Message key="typing" message={TypingMessage} />}
            <div ref={dummydiv}/>
        </div>
    )
}

export default MessagesContainer;