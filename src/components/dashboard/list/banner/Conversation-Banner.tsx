import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/authcontext";
import { ChatInterface } from "../../../../shared/interfaces/interfaces"
import useFetch from '../../../../hooks/use-fetch';
import '../conversation-list.css';
import { useParams } from "react-router";

type ConversationBannerPropTypes = {
    chat: ChatInterface
};

interface IMessage {
    Chatroom: string,
    Id: string,
    Text: string,
    Time: string,
    UserId: string
};

type IResponse = {
    messages: Array<IMessage>,
    messagesAmount: Number
};

const ConversationBanner = ({chat} : ConversationBannerPropTypes) => {
    const navigate = useNavigate();
    const { userInfo, notificationHandler } = useContext(AuthContext);

    const [user] = userInfo;
    const [notification] = notificationHandler;

    const {response, error, isLoading, reFetch} : {response: IResponse | null, error: boolean, isLoading: boolean, reFetch: () => void} = useFetch(`/chatroom/${chat.Id}/messages/1`);


    const [recentMessage, setRecentMessage] = useState("");
    const [recipientName, setRecipientName] = useState("");

    useEffect(() => {
        if(chat.Member1 == user.id) {
            handleRecipientName(chat.Member2)
            return
        }
        handleRecipientName(chat.Member1)
    }, [])

    useEffect(() => {
        if(notification) reFetch()
    }, [notification]);

    useEffect(() => {
       if(response) handleRecentMessage(response)
    }, [response])

    const handleRecipientName = async (id: string) => {
        const res = await fetch(`/auth/users/${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          });
      
          if(!res.ok) {
            //error
            return
          }
      
          const resJSON = await res.json();
          setRecipientName(resJSON.displayname);
    };

    const navigateToChat = () => {
        navigate(`/chats/${chat.Id}`)
    };

    const handleRecentMessage = (res : IResponse ) => {
        if(res.messages.length > 0) {
            const shortenedMessage = res.messages[0].Text.substring(0,15);
            if(res.messages[0].Text.length > 15) return setRecentMessage(shortenedMessage + "...")
            setRecentMessage(res.messages[0].Text)
        }
    };

    return(
        <div className="conversationBanner" onClick={navigateToChat}>
            <div className="bannerName">{recipientName}</div>
            <div className="bannerMessage">{recentMessage}</div>
        </div>
    )
}

export default ConversationBanner