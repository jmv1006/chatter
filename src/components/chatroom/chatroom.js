import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import Message from "./message/message";
import CreateMessage from "./create-message/create-message";
import { io } from "socket.io-client";
import "./chatroom.css";

const Chatroom = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dummydiv = useRef(null);

  const { userInfo, authToken } = useContext(AuthContext);

  const [user] = userInfo;
  const [token] = authToken;

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    setIsLoading(true);
    fetchMessages();
    fetchChatInfo();
    dummydiv.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const newSocket = io("https://jmv1006-chatterapi.herokuapp.com/");
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("room identifier", params.chatId);

      socket.on("roommessage", (message) => {
        fetchMessages();
      });

      socket.on("typing", (id) => {
        if (id != user.id) {
          dummydiv.current.scrollIntoView({ behavior: "smooth" });
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
          }, 2000);
          return;
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    dummydiv.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setIsLoading(true);
    fetchMessages();
    fetchChatInfo();
  }, [params.chatId])

  const emitMessage = (text) => {
    socket.emit("roommessage", text, user, chatInfo);
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
        setIsLoading(false);
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
      .catch((error) => {
        //error fetching chat info
      });
  };

  const mappedMessages = messages.map((message) => (
    <Message key={message.Id} message={message} user={user} />
  ));

  return (
    <div className="chatroomContainer">
      <div className="recipientName">{recipientName}</div>
      <div className="messagesContainer">
        {isLoading ? "Loading..." : null}
        {mappedMessages}
        {isTyping ? (
          <Message
            key={"typing"}
            message={{ userId: "typing", Text: "Typing..." }}
          />
        ) : null}
        <div ref={dummydiv} />
      </div>
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
