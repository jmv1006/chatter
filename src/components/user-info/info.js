import { Link } from "react-router-dom";

const Info = (props) => {
    return(
        <div className="infoContainer">
            <div className="userInfoTopContainer">
                <div className="userInfoDisplayName">{props.user && props.user.DisplayName}</div>
                <div>User Id: {props.user && props.user.Id}</div>
            </div>
            <div className="userInfoUsername">E-mail: {props.user && props.user.Username}</div>
            {props.chat && <Link to={`/chat/${props.chat.Id}`}>Go To Chat</Link>}
            {!props.chat & !props.isLoading & !props.chatIsLoading & !props.isCurrentUser ? (<button onClick={props.createChat} className="createChatBtn">{props.buttonText}</button>) : null}
        </div>
    )
}

export default Info;