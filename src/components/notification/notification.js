import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './notification.css';

const Notification = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {   
        handleText()
        //filter notifications
        if (props.info.user.id == props.user.id) {
            props.setNotification(false)
            return;
        }
        if(params.chatId && props.info.chatInfo.Id == params.chatId) {
            props.setNotification(false)
            return;
        }

        
        setTimeout(() => {
            closeNotification()
        }, 6000);

    }, [])

    const closeNotification = () => {
        props.setNotification(false)
    };

    const handleText = () => {
        if(props.info.message.length > 25) {
            const reducedMsg = props.info.message.substr(0, 25)
            return reducedMsg + "..."
        }
        return props.info.message;
    }

    const navigateToChat = () => {
        navigate(`/chat/${props.info.chatInfo.Id}`)
        closeNotification()
    };

    return(
        <div className="notificationBanner">
            <div onClick={navigateToChat} className="notificationLink">
                {props.info.user.displayname}: {handleText()}
            </div>
            <button onClick={closeNotification} className="notificationBtn">X</button>
        </div>
    )
}

export default Notification;