import { useEffect, useContext, useState } from "react";
import AuthContext from "../../contexts/authcontext";
import ChatBanner from "./chatbanner";
import { Link } from "react-router-dom";
import "./chatlist.css";

const ChatList = () => {
  const { userInfo, authToken } = useContext(AuthContext);

  const [user] = userInfo;
  const [token] = authToken;

  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats()
  }, []);

  const fetchChats = () => {
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
      })
      .catch((error) => console.log(error));
  };

  const mappedChats = chats.map((chat) => (
    <ChatBanner key={chat.Id} chat={chat} user={user} token={token} />
  ));

  return (
    <div className="chatlistContainer">
      <div className="pageLabel">Your Conversations:</div>
      {chats.length === 0
        ? "No Conversations! Click 'Create Chatroom' below to create one."
        : mappedChats}
      <button className="createChatBtn">
        <Link to="/chat/create" className="createChatLink">Create Chatroom</Link>
      </button>
    </div>
  );
};

export default ChatList;
