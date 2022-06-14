import { useNavigate, Link } from "react-router-dom"

const SessionExpired = () => {
    const navigate = useNavigate();

    return(
        <div>
            Session Expired. Please <Link to='/sign-in'>Sign In</Link>.
        </div>
    )
}
export default SessionExpired