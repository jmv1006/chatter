import { Link } from "react-router-dom";

interface IUser {
    Id: string,
    Username: string,
    DisplayName: string
  }
  
  interface IChat {
    Id: string,
    Member1: string,
    Member2: string
  }

type InfoPropTypes = {
    user: IUser,
    chat: IChat | null,
    isLoading: boolean,
    chatIsLoading: boolean,
    isCurrentUser: boolean,
    createChat: () => void,
    buttonText: string
};

const Info = ({ user, chat, isLoading, chatIsLoading, isCurrentUser, createChat, buttonText} : InfoPropTypes) => {
    return(
        <div className="infoContainer">
            <div className="userInfoTopContainer">
                <div className="userInfoDisplayName">{user && user.DisplayName}</div>
                <div>User Id: {user && user.Id}</div>
            </div>
            <div className="userInfoUsername">E-mail: {user && user.Username}</div>
            {chat && <Link to={`/chat/${chat.Id}`}>Go To Chat</Link>}
            {!chat && !isLoading && !chatIsLoading && !isCurrentUser ? (<button onClick={createChat} className="createChatBtn">{buttonText}</button>) : null}
        </div>
    )
}

export default Info;