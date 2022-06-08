import { useContext } from "react";
import AuthPage from "../auth/authpage";
import AuthContext from '../../contexts/authcontext';
import ChatList from "../chatlist/chatlist";

const HomePage = () => {

    const {userInfo} = useContext(AuthContext);

    const [user] = userInfo;

    return(
        <div className="homepageContainer">
            {user ? <ChatList /> : <AuthPage />}
        </div>
    )
}

export default HomePage;