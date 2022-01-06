import React, {useState} from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

function LoginOrLogout(props) {
    
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false)
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)

    function openRegisterModal(){
        setRegisterModalIsOpen(!registerModalIsOpen)
    }

    function openLoginModal(){
        setLoginModalIsOpen(!loginModalIsOpen)
    }


    function logout(){
        localStorage.removeItem('LoginToken')
        setRegisterModalIsOpen(false)
        props.refresh()
    }


    let loginToken = localStorage.getItem('LoginToken')
        if (loginToken == null){
            return <div>
            <li className="nav-item login-buttons">
                <RegisterModal isOpen={registerModalIsOpen} openRegisterModal={openRegisterModal} refresh={props.refresh}/>
                <div onClick={() => {openRegisterModal()}}>Register</div>
            </li>
            <li className="nav-item login-buttons">
                <LoginModal isOpen={loginModalIsOpen} openLoginModal={openLoginModal} refresh={props.refresh}/>
                <div onClick={() => {openLoginModal()}}>Login</div>
            </li>
            </div>
        }
        else{
            return <div>
            <li className="nav-item login-buttons">
                <div>Hello {props.username}</div>
            </li>
            <li className="nav-item login-buttons">
                <div onClick={() => {logout()}}>Logout</div>
            </li>
            </div>
        }
    }


export default LoginOrLogout
