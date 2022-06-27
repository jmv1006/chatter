import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import ConversationList from './list/conversationlist';
import useFetch from '../../hooks/use-fetch';
import AuthContext from '../../contexts/authcontext';
import { ChatInterface } from '../../shared/interfaces/interfaces';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    const [user] = userInfo;

    const [chats, setChats] = useState<Array <ChatInterface>>([]);
    const [fetchURL, setFetchURL] = useState("");

    const {response, isLoading, error, reFetch} = useFetch(fetchURL);

    useEffect(() => {
        if(!user) {
            navigate('/');
            return
        }
        setFetchURL(`/chatroom/users/${user.id}`);
    }, [])

    useEffect(() => {
        if(response) {
            setChats(response);
        };
    }, [response]);

    return(
        <div className="dashBoardPage">
            {user && <ConversationList chats={chats} isLoading={isLoading}/>}
            {user && <Outlet/>}
        </div>
    )
}

export default Dashboard;