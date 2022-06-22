import { useEffect, useContext, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import AuthContext from "../../contexts/authcontext";
import CreateMessage from "./create-message/create-message";
import MessagesContainer from "./messages/messages-container";
import useFetch from "../../hooks/use-fetch";
import "./chatroom.css";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface ChatInfoInterface {
  Id: string,
  Member1: string,
  Member2: string,
  Member1Name: string,
  Member2Name: string,
};

interface IRecipientInfo {
  name: string,
  id: string
};

const Chatroom = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dummydiv = useRef<HTMLDivElement>(null);

  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;


  const [chatInfo, setChatInfo] = useState<ChatInfoInterface >({
    Id: "",
    Member1: "",
    Member2: "",
    Member1Name: "",
    Member2Name: "",
  });

  const [socket, setSocket] = useState<null | Socket>(null);

  const [isTyping, setIsTyping] = useState<boolean >(false);

  const [recipientInfo, setRecipientInfo] = useState<IRecipientInfo >({
    name: "",
    id: "",
  });
  const [page, setPage] = useState<number >(25);

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
      const handleChatInfoResponse = async () => {
        await setChatInfo(chatInfoResponse[0]);
        if (chatInfo.Member1 === user.id) {
          const recipientInfo = {
            name: chatInfo.Member2Name,
            id: chatInfo.Member2,
          };
          return setRecipientInfo(recipientInfo);
        }
        const recipientInfo = {
          name: chatInfo.Member1Name,
          id: chatInfo.Member1,
        };
        setRecipientInfo(recipientInfo);
      }
      handleChatInfoResponse();
    };
  }, [chatInfoResponse]);

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://jmv1006-chatterapi.herokuapp.com/")
    setSocket(socket => newSocket);
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
          setIsTyping(isTyping => true);
          setTimeout(() => {
            setIsTyping(isTyping => false);
          }, 2000);
          return;
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    messagesReFetch();
  }, [page])

  useEffect(() => {
    chatInfoReFetch();
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://jmv1006-chatterapi.herokuapp.com/")
    setSocket(socket => newSocket);
    scrollToBottom();
  }, [params.chatId]);

  const emitMessage = (text: string) => {
    if(socket) socket.emit("roommessage", text, user, chatInfo);
  };

  const sendServerTyping = () => {
    if(socket) socket.emit("typing", user.displayname, user.id);
  };

  const scrollToBottom = () => {
    if(dummydiv.current) dummydiv.current.scrollIntoView({ behavior: "smooth" });
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
        user={user}
      />
    </div>
  );
};

export default Chatroom;
