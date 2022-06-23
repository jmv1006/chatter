import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { UserInterface, ChatInterface } from "../../shared/interfaces/interfaces";
import AuthContext from "../../contexts/authcontext";
import EditUserInfo from "./edit-user-info/edit-user-info";
import Info from "./info";
import useFetch from "../../hooks/use-fetch";
import "./user-info.css";


const UserInfo = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { userInfo } = useContext(AuthContext);

  const [currentUser] = userInfo;

  const [user, setUser] = useState<UserInterface | null>(null);
  const [chat, setChat] = useState<ChatInterface | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean >(false);
  const [buttonText, setButtonText] = useState<string >("Create Chat");
  const [isEditing, setIsEditing] = useState<boolean >(false);

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
      if (user.id == currentUser.id) {
        setIsCurrentUser(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (chatResponse && user && currentUser) {
      const chats: Array<ChatInterface> = chatResponse;
      chats.forEach((chat: ChatInterface) => {
        if (
          (chat.Member1 === currentUser.id && chat.Member2 === user.id) ||
          (chat.Member1 === user.id && chat.Member2 === currentUser.id)
        ) {
          setChat(chat);
          return;
        }
      });
    };
  }, [chatResponse, user, currentUser]);

  useEffect(() => {
    reFetch();
    chatReFetch();
  },[params.userId])

  const createChat = async () => {
    setButtonText("Creating Chat...");

    if(user) {
      const body = {
        member1: currentUser.id,
        member2: user.id,
        member1name: currentUser.displayname,
        member2name: user.displayname,
      };
  
      const response = await  fetch(`/chatroom/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if(!response.ok) {
        setButtonText("Error Creating Chat")
        if(response.status === 500) {
          navigate('/error')
          return
        }
        setTimeout(() => {
          setButtonText("Create Chat")
        }, 2000)
      };
  
      await response.json();
      setButtonText("Success");
      navigate('/');
    }
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
      {isLoading && <ClipLoader />}
      {!isEditing && user ? <Info user={user} chat={chat} isLoading={isLoading} chatIsLoading={chatIsLoading} isCurrentUser={isCurrentUser} createChat={createChat} buttonText={buttonText}/> : null}
      {isCurrentUser && isEditing ? <EditUserInfo user={user} toggleIsEditing={toggleIsEditing} /> : null}
      {isCurrentUser && !isEditing ? <button  className="userInfoBtn" onClick={toggleIsEditing}>Edit Information</button> : null}
      {isCurrentUser && <Link to={'/'}>Back To Home</Link>}
    </div>
  );
};

export default UserInfo;
