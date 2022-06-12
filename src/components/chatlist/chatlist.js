import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authcontext";
import ChatBanner from "./chatbanner";
import { useNavigate } from "react-router-dom";
import "./chatlist.css";

const ChatList = (props) => {
  const navigate = useNavigate();
  const { userInfo, authToken, notificationHandler } = useContext(AuthContext);

  const [user] = userInfo;
  const [token] = authToken;
  const [notification, setNotification] = notificationHandler;

  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if(notification) {
      setNotification(false)
    }
  }, [notification])

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
    <div className="chatList">
      {mappedChats.length === 0 && !props.isLoading ? 'Click "Create Chatroom" To Begin A Chat!': null}
      {mappedChats.length === 0 && props.isLoading ? "Loading Chats..." : null}
      {mappedChats}
    </div>
  );
};

export default ChatList;