import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../../contexts/authcontext';
import { ClipLoader } from 'react-spinners';
import { ChatInterface } from '../../../shared/interfaces/interfaces';
import useFetch from '../../../hooks/use-fetch';
import ConversationBanner from '../list/banner/Conversation-Banner';
import RecentUpdates from './info/recent-updates';
import '../dashboard.css';
import './landing.css'

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
                    {isLoading && <ClipLoader />}
                    {chats.length == 0 && !isLoading ?  "Click Create Chatroom To Start A Chat!" : null}
                    <div className='landingPageChatsContainer'>
                        {chats && !isLoading ? mappedChats : null}
                    </div>
                    <button onClick={navigateToCreateChat} className="landingCreateChatBtn">Create Chatroom</button>
                </div>
                <RecentUpdates />
            </div>
        </div>
    )
}

export default DashboardLanding;