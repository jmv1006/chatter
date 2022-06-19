import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../contexts/authcontext";

const EditUserInfo = ({ user, toggleIsEditing }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [inputValues, setInputValues] = useState({
        username: "",
        displayname: ""
    });
    const [buttonText, setButtonText] = useState("Save & Exit")

    const { userInfo } = useContext(AuthContext);

    const [currentUser] = userInfo;

    useEffect(() => {
        if(currentUser.id != user.Id) {
            navigate('/')
        }
        setInputValues({
            username: user.Username,
            displayname: user.DisplayName
        });
    }, [user])

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValues({
        ...inputValues,
        [e.target.name]: value,
        });
    };

    const submitChanges = async () => {
        setButtonText(buttonText => "Saving...")
        const response = await fetch(`/auth/users/${params.userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(inputValues),
        });

        if(!response.ok) {
            setButtonText(buttonText => "Error Saving")
            setTimeout(() => {
                setButtonText("Save & Exit")
            }, 2000)
            return
        }

        setButtonText(buttonText => "Saved")
        toggleIsEditing()
    };

    const navigateBack = () => {
        toggleIsEditing()
    }

    return(
        <div className="editInfoContainer">
            <div className="editInfoTitle">Edit Information</div>
            <div className="editInfoInputContainer">
                Display Name
                <input type="text" name="displayname" value={inputValues.displayname} onChange={handleChange} placeholder="Required" required/>
            </div>
            <div  className="editInfoInputContainer">
                Username (E-mail)
                <input type="text" name="username" value={inputValues.username} onChange={handleChange} placeholder="Required" required/>
            </div>
            <button className="userInfoBtn" onClick={submitChanges}>{buttonText}</button>
            <button className="userInfoBtn" onClick={navigateBack}>Exit Without Saving</button>
        </div>
    )
}

export default EditUserInfo;