import { Link } from 'react-router-dom';
import './errors.css';

const ServerError = () => {
    return(
        <div className='errorPageContainer'>
            <div>Oops! Something Went Wrong.</div>
            <div>Click <Link to="/">Here</Link> To Return Home, Or Try Again Later.</div>
        </div>
    )
};

export default ServerError;