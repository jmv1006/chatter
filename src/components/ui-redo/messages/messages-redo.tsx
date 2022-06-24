import { useEffect, useState } from "react"

interface IMessages {
    Text: string, 
    Id: string,
    Time: string,
    UserId: string,
    Chatroom: string
};

const MessagesRedo = ({ messagesAndAmount } : any) => {

    const [messages, setMessages] = useState<Array <IMessages>>([]);
    const [messagesAmount, setMessagesAmount] = useState(0);

    useEffect(() => {
        setMessages(messages => messagesAndAmount.messages);
        setMessagesAmount(messagesAmount => messagesAndAmount.messagesAmount)
    }, [messagesAndAmount]);

    const mappedMessages = messages.map((message) => 
        <div key={message.Id}>{message.Text}</div>
    )

    return(
        <div>
            {mappedMessages}
        </div>
    )
}

export default MessagesRedo