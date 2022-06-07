import { useContext, useEffect } from "react";
import AuthPage from "../auth/authpage";
import AuthContext from '../../contexts/authcontext';
import ChatList from "../chatlist/chatlist";
import { io } from "socket.io-client";

const HomePage = () => {

    const {userInfo, authToken} = useContext(AuthContext);

    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    useEffect(() => {
       
    }, [])

    return(
        <div>
            {user ? <ChatList /> : <AuthPage />}
        </div>
    )
}

export default HomePage;