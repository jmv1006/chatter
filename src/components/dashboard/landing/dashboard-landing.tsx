import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/authcontext';
import { ChatInterface } from '../../../shared/interfaces/interfaces';
import useFetch from '../../../hooks/use-fetch';
import '../dashboard.css';
import './landing.css'
import ConversationBanner from '../list/banner/Conversation-Banner';
import { useNavigate } from 'react-router';
import RecentUpdates from './info/recent-updates';


const DashboardLanding = () => {
    const navigate = useNavigate();
    const {userInfo} = useContext(AuthContext)
    const [user] = userInfo;

    const {response, isLoading, error, reFetch} = useFetch(`/chatroom/users/${user.id}`);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if(response) setChats(response)
    }, [response]);

    const mappedChats = chats.map((chat: ChatInterface) => 
        <ConversationBanner chat={chat} key={chat.Id} />
    );

    const navigateToCreateChat = () => {
        navigate('/chat/create')
    };

    return(
        <div className="conversationContainer">
            <div className='landingPageContainer'>
                <div className='titleContainer'>
                    Hey, <strong>{user.displayname}</strong>. Here's what's happening.
                </div>
                <div className='recentChatsContainer'>
                    <div>Your Recent Chats:</div>
                    {chats.length == 0 && "Click Create Chatroom To Start A Chat!"}
                    <div className='landingPageChatsContainer'>
                        {chats && mappedChats}
                    </div>
                    <button onClick={navigateToCreateChat}>Create Chatroom</button>
                </div>
                <RecentUpdates />
            </div>
        </div>
    )
}

export default DashboardLanding;