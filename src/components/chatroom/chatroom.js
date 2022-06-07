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
  const [chatInfo, setChatInfo] = useState({
    Id: "",
    Member1: "",
    Member2: "",
    Member1Name: "",
    Member2Name: "",
  });
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [recipientName, setRecipientName] = useState("");

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    fetchMessages();
    fetchChatInfo();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:4000/");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("room identifier", params.chatId);

      socket.on("message", (message) => {
        fetchMessages();
      });

      socket.on("typing", (id) => {
        if (id != user.id) {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
          }, 2500);
          return;
        }
      });
    }
  }, [socket]);

  const emitMessage = (text) => {
    socket.emit("message", text, user, chatInfo);
  };

  const sendServerTyping = () => {
    socket.emit("typing", user.displayname, user.id);
  };

  const fetchMessages = () => {
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
  };

  const fetchChatInfo = () => {
    fetch(`/chatroom/${params.chatId}`, {
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
        setChatInfo(res[0]);
        if (res[0].Member1 === user.id) {
          return setRecipientName(res[0].Member2Name);
        }
        setRecipientName(res[0].Member1Name);
      })
      .catch((error) => console.log(error));
  };

  const mappedMessages = messages.map((message) => (
    <Message
      key={message.Id}
      message={message}
      user={user}
      recipientName={recipientName}
    />
  ));

  return (
    <div>
      {mappedMessages}
      <CreateMessage
        emitMessage={emitMessage}
        sendServerTyping={sendServerTyping}
        isTyping={isTyping}
        user={user}
        token={token}
      />
    </div>
  );
};

export default Chatroom;
