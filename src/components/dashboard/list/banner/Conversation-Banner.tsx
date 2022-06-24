import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/authcontext";
import { ChatInterface } from "../../../../shared/interfaces/interfaces"
import useFetch from '../../../../hooks/use-fetch';
import '../conversation-list.css';

type ConversationBannerPropTypes = {
    chat: ChatInterface
};


const ConversationBanner = ({chat} : ConversationBannerPropTypes) => {
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    const [user] = userInfo;

    const handleRecipientName = () => {
        if(chat.Member1 === user.id) {
            return "Member 2"
        }
        return "Member 1"
    };

    const navigateToChat = () => {
        navigate(`/chats/${chat.Id}`)
    }

    return(
        <div className="conversationBanner" onClick={navigateToChat}>
            {handleRecipientName()}
        </div>
    )
}

export default ConversationBanner