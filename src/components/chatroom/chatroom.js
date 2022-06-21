import { useEffect, useContext, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuthContext from "../../contexts/authcontext";
import CreateMessage from "./create-message/create-message";
import MessagesContainer from "./messages/messages-container";
import useFetch from "../../hooks/use-fetch";
import "./chatroom.css";

const Chatroom = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dummydiv = useRef(null);

  const { userInfo } = useContext(AuthContext);

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
  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    id: "",
  });
  const [page, setPage] = useState(25);


  const {
    response: chatInfoResponse,
    error: chatInfoError,
    isLoading: chatInfoIsLoading,
    reFetch: chatInfoReFetch,
  } = useFetch(`/chatroom/${params.chatId}`);

  const {
    response: messagesResponse,
    error: messagesError,
    isLoading: messagesAreLoading,
    reFetch: messagesReFetch,
  } = useFetch(`/chatroom/${params.chatId}/messages/${page}`);
  
  

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    if (chatInfoResponse) {
      setChatInfo(chatInfoResponse[0]);
      if (chatInfoResponse[0].Member1 === user.id) {
        const recipientInfo = {
          name: chatInfoResponse[0].Member2Name,
          id: chatInfoResponse[0].Member2,
        };
        return setRecipientInfo(recipientInfo);
      }
      const recipientInfo = {
        name: chatInfoResponse[0].Member1Name,
        id: chatInfoResponse[0].Member1,
      };
      setRecipientInfo(recipientInfo);
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
          scrollToBottom();
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
    messagesReFetch()
  }, [page])

  useEffect(() => {
    chatInfoReFetch();
    const newSocket = io("https://jmv1006-chatterapi.herokuapp.com/");
    setSocket(newSocket);
    scrollToBottom();
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
      <Link className="recipientNameLink" to={`/user/${recipientInfo.id}`}>
        <div className="recipientName">{recipientInfo.name}</div>
      </Link>
      <MessagesContainer
        isTyping={isTyping}
        scrollToBottom={scrollToBottom}
        dummydiv={dummydiv}
        socket={socket}
        messagesResponse={messagesResponse}
        messagesReFetch={messagesReFetch}
        messagesAreLoading={messagesAreLoading}
        page={page}
        setPage={setPage}
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
