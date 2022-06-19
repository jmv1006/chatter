import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/authcontext";
import ChatBanner from "./chatbanner";
import "./chatlist.css";

const ChatList = (props) => {
  const { userInfo, notificationHandler } = useContext(AuthContext);

  const [user] = userInfo;
  const [notification, setNotification] = notificationHandler;

  useEffect(() => {
    if (notification) {
      setNotification(false);
    }
  }, [notification]);

  const mappedChats = props.chats.map((chat) => (
    <ChatBanner key={chat.Id} chat={chat} user={user} /*token={token}*/ />
  ));

  return (
    <div className="chatList">
      {mappedChats.length === 0 && props.isLoading ? "Loading Chats..." : null}
      {mappedChats}
    </div>
  );
};

export default ChatList;
