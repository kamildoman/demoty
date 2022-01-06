import React, {useState, useEffect} from "react";
import axios from "axios";

const SingleComment = (props) => {

    const [owner, setOwner] = useState("")

    let date = props.date.split('T')[0]
    let time = props.date.split('T')[1].split(".")[0]

    function getOwner(){
        if (props.owner == null){
            setOwner("Anonymous User")
        }
        else {
            axios.get('/api/all-users/' + props.owner +'/')
            .then(res => {
                setOwner(res.data.username)
            })
        }
    }

    useEffect( () => {
        getOwner()
    
      }, [])

    return (
        <div className='comment'>
        <p className='comment-user-date'>{owner} - {date}, {time}</p>
            {props.text}
        </div>
    )
}

export default SingleComment
