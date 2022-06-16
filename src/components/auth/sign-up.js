import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
    confirmedpassword: "",
    displayname: "",
  });

  const [error, setError] = useState(false);
  const [buttonText, setButtonText] = useState("Sign Up");

  const handleChange = (e) => {
    const value = e.target.value;

    setFormInfo({
      ...formInfo,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    setButtonText("Signing Up...");
    e.preventDefault();
    fetch("/auth/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        setButtonText("Successful");
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      })
      .catch((error) => {
        setButtonText("Sign Up");
        setError(true);
      });
  };

  return (
    <div className="signUpPageContainer">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signUpForm">
        <div className="inputContainer">
          <label htmlFor="username">Username (E-mail)</label>
          <input
            type="email"
            name="username"
            value={formInfo.username}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">Required</div>
        </div>
        <div className="inputContainer">
          <label htmlFor="displayname">Display Name</label>
          <input
            type="text"
            name="displayname"
            value={formInfo.displayname}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">Required</div>
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formInfo.password}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">
            Must Be At Least 3 Characters Long
          </div>
        </div>
        <div className="inputContainer">
          <label htmlFor="confirmedpassword">Confirm Password</label>
          <input
            type="password"
            name="confirmedpassword"
            value={formInfo.confirmedpassword}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">Must Match Password</div>
        </div>
        {error ? (
          <div className="formError">
            Error Signing Up: Please Ensure All Requirements Are Met
          </div>
        ) : null}
        <button type="submit" className="signUpBtn">
          {buttonText}
        </button>
        <div>Already Have An Account? <Link to="/sign-in">Sign In Here.</Link></div>
      </form>
    </div>
  );
};

export default SignUp;
