import { useContext, useState } from "react";
import AuthContext from "../../../contexts/authcontext";
import { ChatInterface } from "../../../shared/interfaces/interfaces"

type ConversationBannerPropTypes = {
    chat: ChatInterface
};

const ConversationBanner = ({chat} : ConversationBannerPropTypes) => {

    const { userInfo } = useContext(AuthContext);

    const [user] = userInfo;

    const [recipientName, setRecipientName] = useState("");

    const handleRecipientName = () => {
        if(chat.Member1 == user.id) {
            return "Member 2"
        }
        return "Member 1"
    }

    return(
        <div>
            {handleRecipientName()}
        </div>
    )
}

export default ConversationBanner