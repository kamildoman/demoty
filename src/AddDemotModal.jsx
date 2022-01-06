import React, {useState} from "react";
import Modal from 'react-modal';
import axios from "axios";
import Demot from "./Demot"

function AddDemotModal(props) {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [image, setImage] = useState(null)
    // this one is shown while creating demots
    const [imageDisplay, setImageDisplay] = useState(null)

    function addModal(){
        var formData = new FormData();
        let token = localStorage.getItem('LoginToken')

        formData.append("token", token)
        formData.append("title", title);
        formData.append("subtitle", subtitle)
        formData.append("image", image);
        
        setTitle('')
        setSubtitle('')
        setImage(null)
        setImageDisplay(null)
        axios.post("/api/demots/", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).catch(error => {
                alert("Title and photo are required! Error message: " + error)
            })
        props.openAddDemotModal()
        setTimeout(props.refresh, 1000)
        props.setCurrentPage(1)
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


    return (
        <Modal ariaHideApp={false} centered className="addDemotModal" isOpen={props.isOpen}>
        <div className="mainModal">
            <h2>ADD DEMOT</h2>
            <input onChange={handleTitleChange} value={title} maxLength="30" id="title" placeholder="Write your title"></input>
            <input onChange={handleSubtitleChange} value={subtitle} maxLength="150" id="subtitle" placeholder="Write your subtitle"></input>
            <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange}  />
            <label className="imgLabel" htmlFor="img">Upload image</label>
        </div>
            <button className="addDemotButton" onClick={() => {addModal()}}>ADD</button>
        
            <button className="dontAddDemotButton" onClick={() => {props.openAddDemotModal()}}>CLOSE</button>
        <div className="smallDemotAlign">
            <Demot whole={false} title={title} subtitle={subtitle} image={imageDisplay}/>
        </div>   
    </Modal>
    )
}

export default AddDemotModal
