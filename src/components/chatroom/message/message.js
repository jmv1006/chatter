import { useEffect, useContext } from "react"
import AuthContext from "../../../contexts/authcontext";
import './message.css';

const Message = (props) => {
    const { userInfo } = useContext(AuthContext);

    const [user] = userInfo;

    const handleMessage = () => {
        if(props.message.UserId === user.id) {
            return <div className="userMessage"><div className="userText">{props.message.Text}</div></div>
        }
        return <div className="otherMessage"><div className="otherText">{props.message.Text}</div></div>
    };

    return(
        <div>{handleMessage()}</div>
    )
}

export default Message;