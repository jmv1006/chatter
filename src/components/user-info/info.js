import { Link } from "react-router-dom";

const Info = ({ user, chat, isLoading, chatIsLoading, isCurrentUser, createChat, buttonText}) => {
    return(
        <div className="infoContainer">
            <div className="userInfoTopContainer">
                <div className="userInfoDisplayName">{user && user.DisplayName}</div>
                <div>User Id: {user && user.Id}</div>
            </div>
            <div className="userInfoUsername">E-mail: {user && user.Username}</div>
            {chat && <Link to={`/chat/${chat.Id}`}>Go To Chat</Link>}
            {!chat & !isLoading & !chatIsLoading & !isCurrentUser ? (<button onClick={createChat} className="createChatBtn">{buttonText}</button>) : null}
        </div>
    )
}

export default Info;