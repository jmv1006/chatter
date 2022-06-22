import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ISearchResult {
  DisplayName: string,
  Id: string,
  Username: string
};

interface IUser {
  id: string,
  Username: string, 
  DisplayName: string
}

type SearchResultPropTypes = {
  result: ISearchResult,
  user: IUser
}
const SearchResult = ({ user, result, } : SearchResultPropTypes) => {
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState<string >("Create Chat");

  const createChat = async () => {
    setButtonText("Creating Chat...");
    const body = {
      member1: user.id,
      member2: result.Id
    };

    const response = await  fetch(`/chatroom/create`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if(!response.ok) {
      if(response.status === 500) {
        navigate('/error')
        return
      }
      setButtonText("Error Creating Chat");
      setTimeout(() => {
        setButtonText("Create Chat")
      }, 2000);
    };

    await response.json();
    setButtonText("Success");
    navigate('/');
  };

  const redirectToUserInfo = () => {
    navigate(`/user/${result.Id}`)
  }

  return (
    <div className="searchResult">
      {result.DisplayName} ({result.Username})
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
