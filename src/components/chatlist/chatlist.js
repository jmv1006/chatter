import { useEffect, useContext, useState } from "react";
import AuthContext from "../../contexts/authcontext";
import ChatBanner from "./chatbanner";
import { Link } from "react-router-dom";

const ChatList = () => {
  const { userInfo, authToken } = useContext(AuthContext);

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [chats, setChats] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
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
        setChats((chats) => res);
      })
      .catch((error) => console.log(error));
  }, []);

  const mappedChats = chats.map((chat) => (
    <ChatBanner key={chat.Id} chat={chat} user={user} token={token} />
  ));

  return (
    <div>
      {mappedChats}
      <button><Link to="/chat/create">create chatroom</Link></button>
    </div>
  )
};

export default ChatList;
