import React, {useState} from "react";
import AddDemotModal from "./AddDemotModal";
import LoginOrLogout from "./LoginOrLogout";


function Navbar(props){

    const [modalIsOpen, setModalIsOpen] = useState(false)


    function openAddDemotModal(){
        setModalIsOpen(!modalIsOpen)
    }


    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
            <a className="navbar-brand abs" href="/">DEMOT</a>

            <AddDemotModal refresh={props.refresh} isOpen={modalIsOpen} openAddDemotModal={openAddDemotModal}
                setCurrentPage={props.setCurrentPage}
            />

            <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                <ul className="navbar-nav">
                <LoginOrLogout refresh={props.refresh} username={props.username}/>
                    <li className="nav-item">
                        <button onClick={() => {openAddDemotModal()}} className="nav-link m-2 menu-item addButton"></button>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Navbar