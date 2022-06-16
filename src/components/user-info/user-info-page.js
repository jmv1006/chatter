import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import useFetch from "../../hooks/use-fetch";
import "./user-info.css";

const UserInfo = (props) => {
  const params = useParams();

  const { userInfo } = useContext(AuthContext);

  const [currentUser] = userInfo;

  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const { response, error, isLoading, reFetch } = useFetch(
    `/auth/users/${params.userId}`
  );
  const {
    response: chatResponse,
    error: chatError,
    isLoading: chatIsLoading,
    reFetch: chatReFetch,
  } = useFetch(`/chatroom/users/${params.userId}`);

  useEffect(() => {
    if (response) {
      setUser(response);
    }
  }, [response]);

  useEffect(() => {
    if (user) {
      if (user.Id == currentUser.id) {
        setIsCurrentUser(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (chatResponse && user) {
      chatResponse.forEach((chat) => {
        if (
          (chat.Member1 === currentUser.id && chat.Member2 === user.Id) ||
          (chat.Member1 === user.Id && chat.Member2 === currentUser.id)
        ) {
          setChat(chat);
          return;
        }
      });
    }
  }, [chatResponse]);

  return (
    <div className="userInfoPageContainer">
      This is User Info:
      <div>{user && user.Username}</div>
      <div>{chat && <Link to={`/chat/${chat.Id}`}>Go To Chat</Link>}</div>
      <div>
        {!chat && !isLoading && !isCurrentUser ? <div>Create Chat</div> : null}
      </div>
    </div>
  );
};

export default UserInfo;
