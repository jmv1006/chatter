import { useEffect, useContext, useState } from "react";
import AuthContext from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import "./chatlist.css";
import ChatList from "./chatlist";

const ChatListContainer = () => {
  const navigate = useNavigate();
  const { userInfo, authToken } = useContext(AuthContext);

  const [user] = userInfo;
  const [token] = authToken;

  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = () => {
    setIsLoading(true);
    fetch(`/chatroom/users/${user.id}`, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        setChats(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

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
