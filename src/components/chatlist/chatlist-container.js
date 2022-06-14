import { useEffect, useContext, useState } from "react";
import AuthContext from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import "./chatlist.css";
import ChatList from "./chatlist";
import useFetch from "../../hooks/use-fetch";

const ChatListContainer = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;

  const [chats, setChats] = useState(null);

  const {response, error, isLoading, reFetch} = useFetch(`/chatroom/users/${user.id}`)

  useEffect(() => {
    if(response) {
      setChats(response)
    }
  }, [response])

  const navigateToCreateChat = () => {
    navigate("/chat/create");
  };

  return (
    <div className="chatlistContainer">
      <div className="pageLabel">Your Conversations:</div>
      {chats ? <ChatList chats={chats} isLoading={isLoading} /> : null}
      {isLoading ? "Loading Chats..." : null}
      <button className="createChatBtn" onClick={navigateToCreateChat}>
        Create Chatroom
      </button>
    </div>
  );
};

export default ChatListContainer;
