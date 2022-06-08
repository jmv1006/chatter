import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchResult = (props) => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const createChat = () => {
    const body = {
      member1: props.user.id,
      member2: props.result.Id,
      member1name: props.user.displayname,
      member2name: props.result.DisplayName,
    };

    fetch(`/chatroom/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
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
        navigate("/");
      })
      .catch((error) => {
        setError(true)
      });
  };

  return (
    <div className="searchResult">
      {props.result.DisplayName} ({props.result.Username})
      <button className="searchResultBtn" onClick={createChat}>
        {error ? "Error Creating Chatroom" : "Create Chat"}
      </button>
    </div>
  );
};

export default SearchResult;
