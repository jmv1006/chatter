import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchResult = (props) => {
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Create Chat");

  const createChat = () => {
    setButtonText("Creating Chat...");
    const body = {
      member1: props.user.id,
      member2: props.result.Id
    };

    fetch(`/chatroom/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((res) => {
            throw new Error(res);
          });
        }
        return res.json();
      })
      .then((res) => {
        setButtonText("Success");
        navigate("/");
      })
      .catch((error) => {
        setButtonText("Error Creating Chat");
        setTimeout(() => {
          setButtonText("Create Chat");
        }, 2000);
      });
  };

  const redirectToUserInfo = () => {
    navigate(`/user/${props.result.Id}`)
  }

  return (
    <div className="searchResult">
      {props.result.DisplayName} ({props.result.Username})
      <div className="searchResultRightSide">
        <button className="searchResultBtn" onClick={redirectToUserInfo}>
          View
        </button>
        <button className="searchResultBtn" onClick={createChat}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
