import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './chatlist.css';

const ChatBanner = (props) => {
  const [recipientName, setRecipientName] = useState("");

  useEffect(() => {
    if (props.chat.Member1 === props.user.id) {
      return handleUsernameFetch(props.chat.Member2);
    }
    handleUsernameFetch(props.chat.Member1);
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

  return (
    <div className="chatBanner">
      <Link to={"/chat/" + props.chat.Id}>{recipientName}</Link>
    </div>
  );
};
export default ChatBanner;
