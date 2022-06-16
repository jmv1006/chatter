import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/use-fetch";
import Message from "./message/message";

const MessagesContainer = (props) => {
  const params = useParams();

  const [messages, setMessages] = useState([]);

  const {
    response: messagesResponse,
    error: messagesError,
    isLoading: messagesAreLoading,
    reFetch: messagesReFetch,
  } = useFetch(`/chatroom/${params.chatId}/messages/`);

  useEffect(() => {
    if (messagesResponse) {
      setMessages(messagesResponse);
    }
  }, [messagesResponse]);

  useEffect(() => {
    props.scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("roommessage", (message) => {
        messagesReFetch();
      });
    }
  }, [props.socket]);

  useEffect(() => {
    messagesReFetch();
  }, [params.chatId]);

  const mappedMessages = messages.map((message) => (
    <Message key={message.Id} message={message} user={props.user} />
  ));

  return (
    <div className="messagesContainer">
      {messagesAreLoading ? "Loading..." : null}
      {mappedMessages}
      {props.isTyping ? (
        <Message
          key={"typing"}
          message={{ userId: "typing", Text: "Typing..." }}
        />
      ) : null}
      <div ref={props.dummydiv} />
    </div>
  );
};

export default MessagesContainer;
