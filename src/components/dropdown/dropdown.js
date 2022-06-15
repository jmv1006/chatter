import { useNavigate } from 'react-router-dom'
import './dropdown.css'

const DropDown = (props) => {

    const navigate = useNavigate()

    const navigateToSignIn = () => {
        navigate('/sign-in')
        props.toggleDropDown()
    }

    const navigateToSignUp = () => {
        navigate('/sign-up')
        props.toggleDropDown()
    }

    return(
        <div className='dropDownContainer'>
            <div className='exitBtnContainer'>
                <button onClick={props.toggleDropDown} className="dropDownCloseBtn">X</button>
            </div>
            <div className='interactionContainer'>
                {props.user && <div className="dropDownAction" onClick={props.logout}>Sign Out</div>}
                {!props.user && <div className="dropDownAction" onClick={navigateToSignIn}>Sign In</div>}
                {!props.user && <div className="dropDownAction" onClick={navigateToSignUp}>Sign Up</div>}
            </div>
        </div>
    )
}

export default DropDown

/*

*/