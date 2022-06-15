import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import CreateMessage from "./create-message/create-message";
import { io } from "socket.io-client";
import "./chatroom.css";
import useFetch from "../../hooks/use-fetch";
import MessagesContainer from "./messages/messages-container";

const Chatroom = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dummydiv = useRef(null);

  const { userInfo } = useContext(AuthContext);

  const {
    response: chatInfoResponse,
    error: chatInfoError,
    isLoading: chatInfoIsLoading,
    reFetch: chatInfoReFetch,
  } = useFetch(`/chatroom/${params.chatId}`);

  const [user] = userInfo;

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
  }, []);

  useEffect(() => {
    if (chatInfoResponse) {
      setChatInfo(chatInfoResponse[0]);
      if (chatInfoResponse[0].Member1 === user.id) {
        return setRecipientName(chatInfoResponse[0].Member2Name);
      }
      setRecipientName(chatInfoResponse[0].Member1Name);
    }
  }, [chatInfoResponse]);

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
    chatInfoReFetch();
    const newSocket = io("https://jmv1006-chatterapi.herokuapp.com/");
    setSocket(newSocket);
  }, [params.chatId]);

  const emitMessage = (text) => {
    socket.emit("roommessage", text, user, chatInfo);
  };

  const sendServerTyping = () => {
    socket.emit("typing", user.displayname, user.id);
  };

  const scrollToBottom = () => {
    dummydiv.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatroomContainer">
      <div className="recipientName">{recipientName}</div>
      <MessagesContainer
        user={user}
        isTyping={isTyping}
        scrollToBottom={scrollToBottom}
        dummydiv={dummydiv}
        socket={socket}
      />
      <CreateMessage
        emitMessage={emitMessage}
        sendServerTyping={sendServerTyping}
        isTyping={isTyping}
        user={user}
      />
    </div>
  );
};

export default Chatroom;
