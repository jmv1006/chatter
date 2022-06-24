import { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import ConversationList from './conversationlist/conversationlist';
import Conversation from './room/conversation';
import useFetch from '../../hooks/use-fetch';
import AuthContext from '../../contexts/authcontext';
import { ChatInterface } from '../../shared/interfaces/interfaces';
import { Outlet } from 'react-router';

const Dashboard = () => {
    const { userInfo } = useContext(AuthContext);

    const [user] = userInfo;

    const {response, isLoading, error, reFetch} = useFetch(`/chatroom/users/${user.id}`);

    const [chats, setChats] = useState<Array <ChatInterface>>([]);

    useEffect(() => {
        if(response) {
            setChats(response)
        };
    }, [response]);

    return(
        <div className="dashBoardPage">
            <ConversationList chats={chats} />
            <Outlet />
        </div>
    )
}

export default Dashboard;