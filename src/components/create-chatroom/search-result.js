import { useNavigate } from "react-router-dom"

const SearchResult = (props) => {
    const navigate= useNavigate();

    const createChat = () => {
        const body = {
            member1: props.user.id,
            member2: props.result.Id,
            member1name: props.user.displayname,
            member2name: props.result.DisplayName
        }

        fetch(`/chatroom/create`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error
            }
            return res.json()
        })
        .then(res => {
            navigate('/')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div>
            {props.result.DisplayName}
            <button onClick={createChat}>Create Chat</button>
        </div>
    )
}

export default SearchResult