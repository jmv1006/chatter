import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/authcontext";
import ChatBanner from "./chatbanner";
import "./chatlist.css";

const ChatList = ({chats, isLoading}) => {
  const { userInfo, notificationHandler } = useContext(AuthContext);

  const [user] = userInfo;
  const [notification, setNotification] = notificationHandler;

  useEffect(() => {
    if (notification) {
      setNotification(false);
    }
  }, [notification]);

  const mappedChats = chats.map((chat) => (
    <ChatBanner key={chat.Id} chat={chat} user={user} /*token={token}*/ />
  ));

  return (
    <div className="chatList">
      {chats.length === 0 && !isLoading ? "Click Create Chatroom to Create a Chat!" : null}
      {mappedChats}
    </div>
  );
};

export default ChatList;
