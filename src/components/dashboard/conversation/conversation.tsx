import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import AuthContext from '../../../contexts/authcontext';
import useFetch from '../../../hooks/use-fetch';
import MessagesContainer from './messages/container-messages';
import CreateMessage from './create/create-message';
import MobileDropdown from '../mobile-dropdown/mobile-dropdown';
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

    const dummydiv = useRef<HTMLDivElement>(null);

    const [socket, setSocket] = useState<null | Socket>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [chatInfo, setChatInfo] = useState<null | IChatInformation>(null);
    const [page, setPage] = useState(25);

    const [mobileDropDown, setMobileDropDown] = useState(false);

    const {response: messagesAndAmount, error: messagesError, isLoading: messagesAreLoading, reFetch: messagesReFetch} = useFetch(`/chatroom/${params.chatId}/messages/${page}`);
    const {response: chatInfoReponse, error: chatInfoError, isLoading: chatInfoIsLoading, reFetch: chatInfoReFetch} = useFetch(`/chatroom/${params.chatId}`);

    useEffect(() => {
        setPage(45);
        chatInfoReFetch();
        const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://jmv1006-chatterapi.herokuapp.com/")
        setSocket(socket => newSocket);
    
        return() => {
            newSocket.close()
        };
    }, [params.chatId]);

    useEffect(() => {
        if(chatInfoReponse) {
            setChatInfo(chatInfoReponse[0])
            scrollToBottom();
        }
    }, [chatInfoReponse])

    useEffect(() => {
        if (socket) {
            socket.emit("room identifier", params.chatId);

            socket.on("typing", (id) => {
                if(id != user.id) {
                    scrollToBottom();
                    setIsTyping(isTyping => true);
                    setTimeout(() => {
                        setIsTyping(isTyping => false)
                    }, 2000)
                };
            });

            socket.on("roommessage", async (message) => {
                messagesReFetch();
                scrollToBottom();
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

    const handleUserId = () => {
        if(chatInfo) {
            if(chatInfo.Member1 == user.id) {
                return chatInfo.Member2;
            }
            return chatInfo.Member1;
        }
    };

    const incrementPage = () => {
        setPage(page + 45);
    };

    const scrollToBottom = () => {
        if(dummydiv.current) dummydiv.current.scrollIntoView({ behavior: "smooth" });
    };

    const toggleMobileDropdown = () => {
        if(mobileDropDown) {
            setMobileDropDown(false)
            return
        }
        setMobileDropDown(true)
    }

    return(
        <div className='conversationContainer'>
            {mobileDropDown && <MobileDropdown toggle={toggleMobileDropdown}/>}
            <button className='mobileDropDownBtn' onClick={toggleMobileDropdown}>My Conversations</button>
            <div className='recipientNameContainer'>
                <Link to={`/user/${handleUserId()}`} className={"recipientNameLink"}>
                    {chatInfo && handleRecipientName()}
                </Link>
            </div>
            {messagesAndAmount && <MessagesContainer  messagesAndAmount={messagesAndAmount} incrementPage={incrementPage} isTyping={isTyping} dummydiv={dummydiv} messagesAreLoading={messagesAreLoading}/>}
            <CreateMessage user={user} sendServerTyping={sendServerTyping} emitMessage={emitMessage}/>
        </div>
    )
};

export default Conversation;