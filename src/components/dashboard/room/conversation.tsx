import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Socket, io } from 'socket.io-client';
import AuthContext from '../../../contexts/authcontext';
import useFetch from '../../../hooks/use-fetch';
import MessagesContainer from './messages/container-messages';
import CreateMessage from './create/create-message';
import './conversation.css';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
};
  
interface ClientToServerEvents {
    hello: () => void;
};

interface IChatInformation {
    Id: string,
    Member1: string,
    Member2: string,
    Member1Name: string,
    Member2Name: string
};

const Conversation = () => {
    const params = useParams();

    const { userInfo } = useContext(AuthContext);

    const [user] = userInfo;

    const [socket, setSocket] = useState<null | Socket>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [chatInfo, setChatInfo] = useState<null | IChatInformation>(null);
    const [page, setPage] = useState(25);

    const {response: messagesAndAmount, error: messagesError, isLoading: messagesAreLoading, reFetch: messagesReFetch} = useFetch(`/chatroom/${params.chatId}/messages/${page}`);
    const {response: chatInfoReponse, error: chatInfoError, isLoading: chatInfoIsLoading, reFetch: chatInfoReFetch} = useFetch(`/chatroom/${params.chatId}`);

    useEffect(() => {
        const reloadInformation = () => {
            setPage(25);
            chatInfoReFetch();
            const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://jmv1006-chatterapi.herokuapp.com/")
            setSocket(socket => newSocket);
        }
        reloadInformation();
    }, [params.chatId]);

    useEffect(() => {
        if(chatInfoReponse) {
            setChatInfo(chatInfoReponse[0])
        }
    }, [chatInfoReponse])

    useEffect(() => {
        const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://jmv1006-chatterapi.herokuapp.com/")
        setSocket(socket => newSocket);
        return () => {
            newSocket.close();
        };
    },[setSocket]);

    useEffect(() => {
        if (socket) {
            socket.emit("room identifier", params.chatId);

            socket.on("typing", (id) => {
                if(id != user.id) {
                    setIsTyping(isTyping => true);
                    setTimeout(() => {
                        setIsTyping(isTyping => false)
                    }, 2000)
                };
            });

            socket.on("roommessage", async (message) => {
                //this is frozen in time state wise
            });
        };
    }, [socket]);

    const emitMessage = (text: string) => {
        if(socket) socket.emit("roommessage", text, user);
    };
    
    const sendServerTyping = () => {
        if(socket) socket.emit("typing", user.displayname, user.id);
    };

    const handleRecipientName = () => {
        if(chatInfo) {
            if(chatInfo.Member1 == user.id) {
                return chatInfo.Member2Name;
            }
            return chatInfo.Member1Name;
        }
    };

    const incrementPage = () => {
        setPage(page + 25);
    };

    return(
        <div className='conversationContainer'>
            <div className='recipientNameContainer'>{chatInfo && handleRecipientName()}{page}</div>
            {messagesAndAmount && <MessagesContainer messagesAndAmount={messagesAndAmount} incrementPage={incrementPage} isTyping={isTyping}/>}
            <CreateMessage user={user} sendServerTyping={sendServerTyping} emitMessage={emitMessage}/>
        </div>
    )
};

export default Conversation;