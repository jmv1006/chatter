import { useContext } from "react";
import AuthPage from "../auth/authpage";
import AuthContext from '../../contexts/authcontext';
import ChatListContainer from "../chatlist/chatlist-container";

const HomePage = () => {
    const {userInfo} = useContext(AuthContext);

    const [user] = userInfo;

    return(
        <div className="homepageContainer">
            {user ? <ChatListContainer /> : <AuthPage />}
        </div>
    )
}

export default HomePage;