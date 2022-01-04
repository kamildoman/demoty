import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from "axios";
import Demot from './Demot';

const SinglePageDemot = () => {
    const {id} = useParams();
    const [demot, setDemot] = useState("")
    const [doesExist, setDoesExist] = useState(true)

    useEffect(() => {
        async function getData(){
            axios.get('/api/' + id +'/')
            .then(function (response) {
                    setDemot(response?.data) 
            })
            .catch(e => {
                if (e.response.status === 404){
                    setDoesExist(false)
                }
            })
        }
        getData();
        
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
                  />
            </div>
        )
      }
      else {
          return <div><h2>Sorry, it doesn't exist</h2></div>
      }
    
}

export default SinglePageDemot
