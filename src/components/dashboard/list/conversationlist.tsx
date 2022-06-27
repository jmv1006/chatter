import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { ChatInterface } from "../../../shared/interfaces/interfaces";
import ConversationBanner from './banner/Conversation-Banner';
import './conversation-list.css'
import '../dashboard.css';

type ConversationListProps = {
    chats: Array<ChatInterface>,
    isLoading: boolean
};

const ConversationList = ({ chats, isLoading } : ConversationListProps) => {
    const navigate = useNavigate();

    const mappedChats = chats.map((chat) => 
        <ConversationBanner key={chat.Id} chat={chat} />
    );

    const navigateToCreateChat = () => {
        navigate('/chat/create')
    }
    return(
        <div className="conversationListContainer">
            {isLoading ?  <ClipLoader /> : 
                <>
                    <button className="createConversationBtn" onClick={navigateToCreateChat}>Create Conversation</button>
                    {chats.length === 0 && "Click Create Conversation To Start A Chat."}
                    {mappedChats}
                </>
            }
        </div>
    )
}

export default ConversationList;