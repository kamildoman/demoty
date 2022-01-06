import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from "axios";
import Demot from './Demot';
import SingleComment from './SingleComment';

const SinglePageDemot = () => {
    const {id} = useParams();
    const [demot, setDemot] = useState("")
    const [comments, setComments] = useState([])
    const [doesExist, setDoesExist] = useState(true)
    const [commentValue, setCommentValue] = useState("")

    function handleCommentChange(event){
        setCommentValue(event.target.value)
    }

    function addComment(){
        var formData = new FormData();

        let token = localStorage.getItem('LoginToken')

        formData.append("token", token)
        formData.append("comment_text", commentValue);
        formData.append("demot", id);
        setCommentValue("")
        
        axios.post('/api/comments/', formData)
        setTimeout(getComments, 1000)
    }

    function getComments(){
        let results = []
        axios.get('/api/comments/')
        .then(function(response){
            response.data.forEach(comment => {
                if (comment.demot === Number(id)){
                    results.push(comment)
                }
            })
            setComments(results.reverse())
        })
    }

    useEffect(() => {
        async function getData(){
            axios.get('/api/demots/' + id +'/')
            .then(function (response) {
                    console.log(response.data)
                    setDemot(response?.data) 
            })
            .catch(e => {
                if (e.response.status === 404){
                    setDoesExist(false)
                }
            })
        }
       

        getData();
        getComments();
        
      }, [id])
      if (doesExist){
        return (
            <div>
                <Demot
                  key= {demot.id} 
                  id = {demot.id}
                  whole = {true}
                  title={demot.title}
                  subtitle={demot.subtitle}  
                  image={demot.image}
                  upvote={demot.upvote}
                  downvote={demot.downvote}
                  ips={demot.ips}
                  owner={demot.owner}
                  />
                  <div>
                    <input 
                    id="comments-input" onChange={handleCommentChange} value={commentValue} placeholder="Add a comment..." />
                    <button type="submit" onClick={addComment}     
                    className="comments-button">Post</button>
                </div>
                  {comments.map(comment => (
                      <SingleComment 
                          key={comment.id}
                          text={comment.comment_text}
                          date={comment.date}
                          owner={comment.owner}
                      />
                  ))}
            </div>
        )
      }
      else {
          return <div><h2>Sorry, it doesn't exist</h2></div>
      }
    
}

export default SinglePageDemot
