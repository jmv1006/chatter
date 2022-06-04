import { useEffect, useContext, useState } from "react";
import AuthContext from "../../contexts/authcontext";

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
        console.log(res);
        setChats(chats => res)
      })
      .catch((error) => console.log(error));
  }, []);

  const mappedChats = chats.map((chat) => 
    <div key={chat.Id}>Chat</div>
  )

  return (
    <div>
        {mappedChats}
    </div>
  )
};

export default ChatList;
