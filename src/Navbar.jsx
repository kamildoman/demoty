import React, {useState} from "react";
import Modal from 'react-modal';
import axios from "axios";
import Demot from "./Demot"


function Navbar(props){

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [image, setImage] = useState(null)
    // this one is shown while creating demots
    const [imageDisplay, setImageDisplay] = useState(null)

    function addModal(){
        var formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle)
        formData.append("image", image);
        setTitle('')
        setSubtitle('')
        setImage(null)
        setImageDisplay(null)
        axios.post("/api/", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).catch(error => {
                alert("Title and photo are required! Error message: " + error)
            })
        setModalIsOpen(false)
        setTimeout(props.refresh, 1000)
        props.setCurrentPage(1)
    }

    function openAddDemotModal(){
        setModalIsOpen(!modalIsOpen)
    }

    function handleTitleChange(event){
        setTitle(event.target.value)
    }
    function handleSubtitleChange(event){
        setSubtitle(event.target.value)
    }
    function handleImageChange(event){
        var file = event.target.files[0]
        setImage(file)
        setImageDisplay(URL.createObjectURL(file))
    }

    return (<nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
    <a className="navbar-brand abs" href="/">DEMOT</a>
    <Modal ariaHideApp={false} centered className="addDemotModal" isOpen={modalIsOpen}>
    <div className="mainModal">
        <h2>ADD DEMOT</h2>
        <input onChange={handleTitleChange} value={title} maxLength="30" id="title" placeholder="Write your title"></input>
        <input onChange={handleSubtitleChange} value={subtitle} maxLength="150" id="subtitle" placeholder="Write your subtitle"></input>
        <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange}  />
        <label className="imgLabel" htmlFor="img">Upload image</label>
    </div>
        <button className="addDemotButton" onClick={() => {addModal()}}>ADD</button>
    
        <button className="dontAddDemotButton" onClick={() => {openAddDemotModal()}}>CLOSE</button>
    <div className="smallDemotAlign">
        <Demot whole={false} title={title} subtitle={subtitle} image={imageDisplay}/>
    </div>
    
    </Modal>
    <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
        <ul className="navbar-nav ml-auto flex-nowrap">
            <li className="nav-item">
                <button onClick={() => {openAddDemotModal()}} className="nav-link m-2 menu-item addButton"></button>
            </li>

        </ul>
    </div>
  </nav>)
}

export default Navbar