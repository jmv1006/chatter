import { ChatInterface, UserInterface } from "../../../shared/interfaces/interfaces";
import ConversationBanner from './banner/Conversation-Banner';
import './conversation-list.css'
import '../dashboard.css';
import { useNavigate } from "react-router";

type ConversationListProps = {
    chats: Array<ChatInterface>,
};

const ConversationList = ({ chats } : ConversationListProps) => {
    const navigate = useNavigate();

    const mappedChats = chats.map((chat) => 
        <ConversationBanner key={chat.Id} chat={chat} />
    );

    const navigateToCreateChat = () => {
        navigate('/chat/create')
    }
    return(
        <div className="conversationListContainer">
            Your Conversations:
            {chats.length === 0 && "Click Create Conversation"}
            <button className="createConversationBtn" onClick={navigateToCreateChat}>Create Conversation</button>
            {mappedChats}
        </div>
    )
}

export default ConversationList;