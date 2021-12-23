import React, { useState, useEffect } from "react";
import axios from "axios";
import Demot from "./Demot"
import Navbar from './Navbar'
import Pagination from './Pagination'
import './App.css';




function App() {
  const [demots, setDemots] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  const refreshList = () => {
      axios.get('/api/')
      .then(function (response) {
        console.log(response)
        setDemots(response.data.reverse()) 
      })
      console.log("refreshed")
    };

    useEffect(() => {
      refreshList()
    }, [])
    
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = demots.slice(indexOfFirstPost, indexOfLastPost)

    function paginate(pageNumber){
      setCurrentPage(pageNumber)
    }

    return (<div>
              <Navbar setCurrentPage={setCurrentPage} refresh={refreshList}/>
              <div className="main">
              {currentPosts.map(demot =>(
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
            ))}
            <Pagination 
            postsPerPage={postsPerPage} 
            totalPosts={demots.length} 
            paginate={paginate}  
            />
            </div>
           
            </div>)
    
  }

export default App;
