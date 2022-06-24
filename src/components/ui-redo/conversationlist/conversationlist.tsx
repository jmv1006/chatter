import { useEffect } from "react";
import { ChatInterface, UserInterface } from "../../../shared/interfaces/interfaces";
import ConversationBanner from '../red-chatbanner/Conversation-Banner';
import './conversation-list.css';

type ConversationListProps = {
    chats: Array<ChatInterface>,
};

const ConversationList = ({ chats } : ConversationListProps) => {
    
    useEffect(() => {
        console.log(chats)
    }, []);

    const mappedChats = chats.map((chat) => 
        <ConversationBanner key={chat.Id} chat={chat} />
    );

    return(
        <div className="conversationListContainer">
            <button>Create Conversation</button>
            {mappedChats}
        </div>
    )
}

export default ConversationList;