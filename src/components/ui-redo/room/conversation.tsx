import { useEffect } from 'react';
import { useParams } from 'react-router';
import useFetch from '../../../hooks/use-fetch';
import MessagesRedo from '../messages/messages-redo';
import './conversation.css';

const Conversation = () => {
    const params = useParams();

    const {response: messagesAndAmount, error, isLoading, reFetch} = useFetch(`/chatroom/${params.chatId}/messages/25`);

    useEffect(() => {
        reFetch();
    }, [params.chatId])
    
    return(
        <div className='conversationContainer'>
            {params.chatId}
            {messagesAndAmount && <MessagesRedo messagesAndAmount={messagesAndAmount} />}
        </div>
    )
};

export default Conversation;