import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthContext from "../../contexts/authcontext";
import ChatList from "./chatlist";
import useFetch from "../../hooks/use-fetch";
import "./chatlist.css";

interface ChatInterface {
  Id: string,
  Member1: string,
  Member2: string
};

const ChatListContainer = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;

  const [chats, setChats] = useState<Array<ChatInterface> | null>(null);

  const { response, error, isLoading, reFetch } = useFetch(
    `/chatroom/users/${user.id}`
  );

  useEffect(() => {
    if (response) {
      setChats(response);
    }
  }, [response]);

  const navigateToCreateChat = () => {
    navigate("/chat/create");
  };

  return (
    <div className="chatlistContainer">
      <div className="pageLabel">Your Conversations:</div>
      {chats ? <ChatList chats={chats} isLoading={isLoading} /> : null}
      {isLoading && <ClipLoader />}
      <button className="createChatBtn" onClick={navigateToCreateChat}>
        Create Chatroom
      </button>
    </div>
  );
};

export default ChatListContainer;
