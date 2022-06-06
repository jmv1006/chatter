import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import Message from "./message/message";
import CreateMessage from "./create-message/create-message";
import { io } from "socket.io-client";

const Chatroom = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const { userInfo, authToken } = useContext(AuthContext);

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(!user) {
      return navigate('/')
    };

    fetch(`/chatroom/${params.chatId}/messages`, {
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
      setMessages(res);
    })
    .catch((error) => console.log(error));

  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:4000/");
    setSocket(newSocket);
  }, [setSocket]);

  const emitMessage = (text) => {
    socket.emit("message", text);

    socket.on("message", (message) => {
      console.log(message);
    });
  }

  const mappedMessages = messages.map((message) => (
    <Message key={message.Id} message={message} />
  ));

  return (
    <div>
      {mappedMessages}
      <CreateMessage emitMessage={emitMessage}/>
    </div>
  )
};

export default Chatroom;
