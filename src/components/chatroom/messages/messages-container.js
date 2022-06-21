import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Message from "./message/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../chatroom.css'

const MessagesContainer = ({ isTyping, scrollToBottom, dummydiv, socket, messagesResponse, messagesReFetch, messagesAreLoading, page, setPage }) => {
  const params = useParams();

  const [messages, setMessages] = useState([]); 
  const [totalMessagesAmount, setTotalMessagesAmount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (messagesResponse) {
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
      {isTyping ? (<Message key={"typing"} message={{ userId: "typing", Text: "Typing..." }} />) : null}
      <div ref={dummydiv} />
    </div>
  );
};

export default MessagesContainer;
