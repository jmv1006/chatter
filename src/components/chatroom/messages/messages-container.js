import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Message from "./message/message";

const MessagesContainer = ({ isTyping, scrollToBottom, dummydiv, socket, messagesResponse, messagesReFetch, messagesAreLoading }) => {
  const params = useParams();

  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    if (messagesResponse) {
      setMessages(messagesResponse);
    }
  }, [messagesResponse]);

  useEffect(() => {
    scrollToBottom()
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

  return (
    <div className="messagesContainer">
      {messagesAreLoading && <ClipLoader />}
      {!messagesAreLoading && messages.length === 0 ? "No Messages In Chatroom Yet!" : null}
      {mappedMessages}
      {isTyping ? (<Message key={"typing"} message={{ userId: "typing", Text: "Typing..." }} />) : null}
      <div ref={dummydiv} />
    </div>
  );
};

export default MessagesContainer;
