import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/')
    }
    return(
        <div className="header" onClick={navigateHome}>
            Chatter
        </div>
    )
}

export default Header;