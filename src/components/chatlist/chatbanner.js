import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./chatlist.css";

const ChatBanner = (props) => {
  const [recipientName, setRecipientName] = useState("");
  const [recentMessage, setRecentMessage] = useState("");

  useEffect(() => {
    if (props.chat.Member1 === props.user.id) {
      handleRecentMessageFetch();
      handleUsernameFetch(props.chat.Member2);
      return;
    }
    handleUsernameFetch(props.chat.Member1);
    handleRecentMessageFetch();
  }, []);

  const handleUsernameFetch = (id) => {
    fetch(`/auth/users/${id}`, {
      headers: {
        Authorization: "Bearer " + props.token,
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
        setRecipientName(res[0].DisplayName);
      })
      .catch((error) => console.log(error));
  };

  const handleRecentMessageFetch = () => {
    fetch(`/chatroom/${props.chat.Id}/messages`, {
      headers: {
        Authorization: "Bearer " + props.token,
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
        const index = res.length - 1;
        setRecentMessage(res[index].Text);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="chatBanner">
      <Link to={"/chat/" + props.chat.Id}>{recipientName}</Link>
      {recentMessage}
    </div>
  );
};
export default ChatBanner;
