import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import axios from "axios";

function RegisterModal(props) {

    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function getUsernames(){
        axios.get('/api/all-users/').then(res =>{
            setUsers(res.data)
        })
    }

    useEffect(() => {
        getUsernames()
      }, [])
    

    function register(){
        if (password !== confirmPassword){
            alert("Passwords don't match")
        }
        else if (password.length < 5){
            alert("Password should be at least 5 characters long")
        }
        else if (users.length > 0 && users.find(user => user.username === username)) {
            alert("This username already exists!")
           }
        else {
            var formData = new FormData();
            formData.append('username', username)
            formData.append('email', email)
            formData.append('password', password)     
            axios.post("/register/", formData)
            .then(function (response) {
                localStorage.setItem('LoginToken', response.data.token);
            }).catch(e => {
                alert("Error! Please enter a valid username and email")
            })
            props.refresh()
            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }
    }


    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleConfirmPasswordChange(event){
        setConfirmPassword(event.target.value)
    }


    return (
        <Modal ariaHideApp={false} centered className="addDemotModal" isOpen={props.isOpen}>
        <div className="mainModal">
            <h2>REGISTER</h2>
            <input onChange={handleUsernameChange} value={username} 
            maxLength="30" id="username" placeholder="Write your username" />
            <input onChange={handleEmailChange} value={email} 
            maxLength="30" id="email" placeholder="Write your email" />
            <input type="password" onChange={handlePasswordChange} value={password} 
            maxLength="30" id="password" placeholder="Write your password" />
            <input type="password" onChange={handleConfirmPasswordChange} value={confirmPassword} 
            maxLength="30" id="confirmPassword" placeholder="Confirm your password" />
            
            
        </div>
            <button className="addDemotButton" onClick={() => {register()}}>REGISTER</button>
        
            <button className="dontAddDemotButton" onClick={() => {props.openRegisterModal()}}>CLOSE</button>
    </Modal>
    )
}

export default RegisterModal
