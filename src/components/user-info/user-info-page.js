import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import EditUserInfo from "./edit-user-info/edit-user-info";
import Info from "./info";
import useFetch from "../../hooks/use-fetch";
import "./user-info.css";

const UserInfo = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const { userInfo } = useContext(AuthContext);

  const [currentUser] = userInfo;

  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [buttonText, setButtonText] = useState("Create Chat");
  const [isEditing, setIsEditing] = useState(false);

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
    if (user && currentUser) {
      if (user.Id == currentUser.id) {
        setIsCurrentUser(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (chatResponse && user && currentUser) {
      chatResponse.forEach((chat) => {
        if (
          (chat.Member1 === currentUser.id && chat.Member2 === user.Id) ||
          (chat.Member1 === user.Id && chat.Member2 === currentUser.id)
        ) {
          setChat(chat);
          return;
        }
      });
    };
  }, [chatResponse, user, currentUser]);

  const createChat = () => {
    setButtonText("Creating Chat...");
    const body = {
      member1: currentUser.id,
      member2: user.Id,
      member1name: currentUser.displayname,
      member2name: user.DisplayName,
    };

    fetch(`/chatroom/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res);
        }
        return res.json();
      })
      .then((res) => {
        setButtonText("Success");
        navigate("/");
      })
      .catch((error) => {
        setButtonText("Error Creating Chat");
        setTimeout(() => {
          setButtonText("Create Chat");
        }, 2000);
      });
  };

  const toggleIsEditing = () => {
    if(isEditing) {
      reFetch()
      setIsEditing(false)
      return
    }
    setIsEditing(true)
  };

  return (
    <div className="userInfoPageContainer">
      {isLoading && "Loading..."}
      {!isEditing && <Info user={user} chat={chat} isLoading={isLoading} chatIsLoading={chatIsLoading} isCurrentUser={isCurrentUser} createChat={createChat} buttonText={buttonText}/>}
      {isCurrentUser && isEditing ? <EditUserInfo user={user} toggleIsEditing={toggleIsEditing} /> : null}
      {isCurrentUser && !isEditing ? <button  className="userInfoBtn" onClick={toggleIsEditing}>Edit Information</button> : null}
      {isCurrentUser && <Link to={'/'}>Back To Home</Link>}
    </div>
  );
};

export default UserInfo;
