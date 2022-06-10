import { useEffect, useContext, useState } from "react";
import AuthContext from "../../contexts/authcontext";
import ChatBanner from "./chatbanner";
import { useNavigate } from "react-router-dom";
import "./chatlist.css";

const ChatList = () => {
  const navigate = useNavigate();
  const { userInfo, authToken } = useContext(AuthContext);

  const [user] = userInfo;
  const [token] = authToken;

  const [chats, setChats] = useState([]);
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
        // Error fetching chats
      });
  };

  const navigateToCreateChat = () => {
    navigate("/chat/create");
  };

  const mappedChats = chats.map((chat) => (
    <ChatBanner key={chat.Id} chat={chat} user={user} token={token} />
  ));

  return (
    <div className="chatlistContainer">
      <div className="pageLabel">Your Conversations:</div>
      {mappedChats.length === 0 && !isLoading
        ? 'Click "Create Chatroom" To Begin A Chat!'
        : null}
      {isLoading && mappedChats.length === 0 ? "Loading Chats..." : null}
      {mappedChats}
      <button className="createChatBtn" onClick={navigateToCreateChat}>
        Create Chatroom
      </button>
    </div>
  );
};

export default ChatList;
