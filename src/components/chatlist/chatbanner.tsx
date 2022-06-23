import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthContext from "../../contexts/authcontext";
import { UserInterface, ChatInterface } from "../../shared/interfaces/interfaces";
import "./chatlist.css";

type ChatBannerPropTypes = {
  user: UserInterface,
  chat: ChatInterface
}

const ChatBanner = ({user, chat}: ChatBannerPropTypes) => {
  const { notificationHandler } = useContext(AuthContext);

  const [notification] = notificationHandler;

  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState<string >("");
  const [recentMessage, setRecentMessage] = useState<string >("");
  const [isLoading, setIsLoading] = useState<boolean >(false);

  useEffect(() => {
    if (chat.Member1 === user.id) {
      handleRecentMessageFetch();
      handleUsernameFetch(chat.Member2);
      setIsLoading(true);
      return;
    }
    handleUsernameFetch(chat.Member1);
    handleRecentMessageFetch();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (notification) {
      handleRecentMessageFetch();
    }
  }, [notification]);

  const handleUsernameFetch = async (id: string) => {
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
    setIsLoading(false);
  };

  const handleRecentMessageFetch = async () => {
    const res = await fetch(`/chatroom/${chat.Id}/messages/25`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if(!res.ok) {
      //error fetching
      return
    };

    const resJSON = await res.json();

    const index = resJSON.messages.length - 1;

    if(index <= 0) {
      return
    };
    
    const messages = resJSON.messages;

    setRecentMessage(messages[index].Text);
  };

  const handleText = () => {
    if (recentMessage.length > 30) {
      const reducedMsg = recentMessage.substring(0, 30);
      return reducedMsg + "....";
    }
    return recentMessage;
  };

  const navigateToChat = () => {
    navigate("/chat/" + chat.Id);
  };

  return (
    <div className="chatBanner" onClick={navigateToChat}>
      {isLoading && <ClipLoader />}
      <div className="chatBannerName">{recipientName}</div>
      <div className="recentMsg">{handleText()}</div>
    </div>
  );
};
export default ChatBanner;