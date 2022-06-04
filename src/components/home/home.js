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
        console.log("Mounted")
        /*
        const socket = io("http://localhost:4000/")
        socket.emit("message", "Hello from frontend!!")

        socket.on("message", (message) => {
            console.log(message)
        });
        */
    }, [])

    return(
        <div>
            {user ? <ChatList /> : <AuthPage />}
        </div>
    )
}

export default HomePage;