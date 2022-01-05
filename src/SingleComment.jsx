import React from 'react'

const SingleComment = (props) => {
    let date = props.date.split('T')[0]
    let time = props.date.split('T')[1].split(".")[0]
    return (
        <div className='comment'>
        <p className='comment-user-date'>Anonymous User - {date}, {time}</p>
            {props.text}
        </div>
    )
}

export default SingleComment
