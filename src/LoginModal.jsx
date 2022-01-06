import React, {useState} from "react";
import Modal from 'react-modal';
import axios from "axios";

function LoginModal(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function login(){
        var formData = new FormData();
        formData.append('username', username)
        formData.append('password', password)
        axios.post("/login/", formData)
        .then(function (response) {
            console.log(response.data)
            localStorage.setItem('LoginToken', response.data.token);
        }).catch(e => {
            alert("Wrong login or password!")
        })
        setUsername("")
        setPassword("")
        props.refresh()
    }

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    
    return (
        <Modal ariaHideApp={false} centered className="addDemotModal" isOpen={props.isOpen}>
        <div className="mainModal">
            <h2>LOGIN</h2>
            <input onChange={handleUsernameChange} value={username} 
            maxLength="30" id="username" placeholder="Write your username" />
            <input type="password" onChange={handlePasswordChange} value={password} 
            maxLength="30" id="password" placeholder="Write your password" />
            
        </div>
            <button className="addDemotButton" onClick={() => {login()}}>LOGIN</button>
        
            <button className="dontAddDemotButton" onClick={() => {props.openLoginModal()}}>CLOSE</button>
    </Modal>
    )
}

export default LoginModal
