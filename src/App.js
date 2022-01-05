import React, { useState, useEffect } from "react";
import axios from "axios";
import Demot from "./Demot"
import Navbar from './Navbar'
import Pagination from './Pagination'
import SinglePageDemot from "./SinglePageDemot";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";




function App() {
  const [demots, setDemots] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  const refreshList = () => {
      axios.get('/api/demots/')
      .then(function (response) {
        setDemots(response.data.reverse()) 
      })
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

    return (<Router><div>
              <Navbar setCurrentPage={setCurrentPage} refresh={refreshList}/>
              <div className="main">
              <Routes>
              <Route path="/" exact element= {<>{currentPosts.map(demot =>(
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
            ))}<Pagination 
            postsPerPage={postsPerPage} 
            totalPosts={demots.length} 
            paginate={paginate}  
            /></>} />

            <Route path="/demot/:id" element={<SinglePageDemot />} />
            </Routes>
            
            </div>
           
            </div></Router>)
    
  }

export default App;
