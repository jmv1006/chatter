import { useContext } from "react";
import AuthPage from "../auth/authpage";
import AuthContext from '../../contexts/authcontext';
import ChatList from "../chatlist/chatlist";

const HomePage = () => {

    const {userInfo, authToken} = useContext(AuthContext);

    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    return(
        <div className="homepageContainer">
            {user ? <ChatList /> : <AuthPage />}
        </div>
    )
}

export default HomePage;