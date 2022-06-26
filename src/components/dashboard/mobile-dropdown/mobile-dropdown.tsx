import { useContext, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import AuthContext from '../../../contexts/authcontext';
import ConversationBanner from '../list/banner/Conversation-Banner';
import { ChatInterface } from '../../../shared/interfaces/interfaces';
import '../dashboard.css';
import './mobile-dropdown.css';
import useFetch from '../../../hooks/use-fetch';
import { useNavigate, useParams } from 'react-router';

type MobileDropdownProps = {
    toggle: () => void
}

const MobileDropdown = ({toggle} : MobileDropdownProps) => {
    const navigate = useNavigate();
    const params = useParams();

    const { userInfo } = useContext(AuthContext);

    const [user] = userInfo;

    const {response, isLoading, error, reFetch} = useFetch(`/chatroom/users/${user.id}`);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if(response) setChats(response)
    }, [response]);

    const mappedChats = chats.map((chat: ChatInterface) => 
        <ConversationBanner key={chat.Id} chat={chat} />
    );

    const navigateToCreateChat = () => {
        navigate('/chat/create')
    };

    return(
        <div className="mobileDropDownContainer">
            Your Conversations:
            {isLoading && <ClipLoader />}
            {mappedChats}
            <button onClick={navigateToCreateChat} className='mobileDropDownCloseBtn'>Create Chatroom</button>
            <button onClick={toggle} className="mobileDropDownCloseBtn">Close</button>
        </div>
    )
}

export default MobileDropdown;