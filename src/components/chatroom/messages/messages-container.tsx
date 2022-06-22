import { Ref, RefObject, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Socket } from "socket.io-client";
import Message from "./message/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../chatroom.css'

interface IMessage {
  Text: string,
  Id: string, 
  Time: string,
  UserId: string
};

interface IMessagesResponse {
  messages: Array<IMessage >,
  messagesAmount: number
};

type MessagesContainerPropTypes = {
  isTyping: boolean;
  scrollToBottom: () => void,
  dummydiv: RefObject<HTMLDivElement>,
  socket: Socket | null,
  messagesResponse: IMessagesResponse | null,
  messagesReFetch: () => void,
  messagesAreLoading: boolean,
  page: number,
  setPage: (value: number) => void
};

const MessagesContainer = ({ isTyping, scrollToBottom, dummydiv, socket, messagesResponse, messagesReFetch, messagesAreLoading, page, setPage } : MessagesContainerPropTypes) => {
  const params = useParams();

  const [messages, setMessages] = useState<Array <IMessage>>([]); 
  const [totalMessagesAmount, setTotalMessagesAmount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (messagesResponse) {
      console.log(messagesResponse)
      setMessages(messagesResponse.messages); 
      setTotalMessagesAmount(messagesResponse.messagesAmount)
    }
  }, [messagesResponse]);

  useEffect(() => {
    if(!hasMounted && messages.length > 0) {
      scrollToBottom();
      setHasMounted(true)
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("roommessage", async (message) => {
        await messagesReFetch();
        scrollToBottom();
      });
    }
  }, [socket]);

  useEffect(() => {
    messagesReFetch();
  }, [params.chatId]);

  const mappedMessages = messages.map((message) => (
    <Message key={message.Id} message={message} />
  ));

  const fetchMoreMessages = () => {
    if(page > totalMessagesAmount) {
      return
    }
    setPage(page + 25)
  }
  return (
    <div className="messagesContainer">
      {messagesAreLoading && <ClipLoader />}
      {page < totalMessagesAmount && <button className="loadMoreBtn" onClick={fetchMoreMessages}>{messagesAreLoading ? "Loading..." : "Load More"}</button>}
      {!messagesAreLoading && messages.length === 0 ? "No Messages In Chatroom Yet!" : null}
      {mappedMessages}
      {isTyping ? (<Message key={"typing"} message={{ UserId: "typing", Text: "Typing...", Id: "typing", Time: "Now" }} />) : null}
      <div ref={dummydiv} />
    </div>
  );
};

export default MessagesContainer;
