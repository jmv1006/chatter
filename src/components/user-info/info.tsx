import { Link } from "react-router-dom";
import {UserInterface, ChatInterface} from '../../shared/interfaces/interfaces'

type InfoPropTypes = {
    user: UserInterface,
    chat: ChatInterface | null,
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
                <div className="userInfoDisplayName">{user && user.displayname}</div>
                <div>User Id: {user && user.id}</div>
            </div>
            <div className="userInfoUsername">E-mail: {user && user.username}</div>
            {chat && <Link to={`/chats/${chat.Id}`}>Go To Chat</Link>}
            {!chat && !isLoading && !chatIsLoading && !isCurrentUser ? (<button onClick={createChat} className="createChatBtn">{buttonText}</button>) : null}
        </div>
    )
}

export default Info;