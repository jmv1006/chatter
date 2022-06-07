import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './notification.css';

const Notification = (props) => {
    const params = useParams();

    useEffect(() => {   
        //filter notifications
        if (props.info.user.id == props.user.id) {
            props.setNotification(false)
            return;
        }
        if(params.chatId && props.info.chatInfo.Id == params.chatId) {
            props.setNotification(false)
            return;
        }
    }, [])

    const closeNotification = () => {
        props.setNotification(false)
    }

    return(
        <div className="notificationBanner">
            Message from {props.info.user.displayname}: {props.info.message}
            <button onClick={closeNotification}>x</button>
        </div>
    )
}

export default Notification;