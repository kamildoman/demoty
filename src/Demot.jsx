import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

function Demot(props){
    var [totalVote, setTotalVote] = useState(props.upvote - props.downvote)
    var [upVote, setUpVote] = useState(props.upvote)
    var [downVote, setDownVote] = useState(props.downvote)
    const [ip, setIP] = useState('');
    const [isAdded, setIsAdded] = useState(false)
    const [owner, setOwner] = useState("")

    function getOwner(){
        if (props.owner == null){
            setOwner("Anonymous User")
        }
        else {
            axios.get('/api/all-users/' + props.owner +'/')
            .then(res => {
                setOwner(res.data.username)
            })
        }
    }

    const getIPData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setIP(res.data.IPv4)
      }

      useEffect( () => {
        getIPData()
        getOwner()
    
      }, [])
      var ip_to_add = props.ips + ", " + ip

    function voteUp(){
        if (isAdded === false){
            if (props.ips == null || !props.ips.includes(ip)){
                setIsAdded(true)
                setUpVote(upVote += 1)   
                axios.put('/api/demots/' + props.id + '/', {title: props.title, upvote: upVote, ips: ip_to_add})
                setTotalVote(totalVote +=1)
            }
            else{
                alert("You already voted!")
            }
        }
        else {
            alert("You can vote only once!")
        }
        };

    function voteDown(){
        if (isAdded === false){
            if (props.ips == null || !props.ips.includes(ip)){
                setIsAdded(true)
                setDownVote(downVote += 1)
                axios.put('/api/demots/' + props.id + '/', {title: props.title, downvote: downVote, ips: ip_to_add})
                setTotalVote(totalVote -=1)
            }
            else{
                alert("You already voted!")
            }
        }
        else {
            alert("You can vote only once!")
        }
    }

    

    function ButtonPlus(){

        return (<button onClick={() =>{
            voteUp()
        }} className="plus buttonMark">+</button>)
    }

    function ButtonMinus(){
        return (<button onClick={() =>{
            voteDown()
}}
            className="minus buttonMark">-</button>)
    }

    if (props.whole === true){
        return <div className="whole-demot">
                <Link to={`/demot/${props.id}`} className="demot">
                    <img alt="demot" className="demot-img" src={props.image} /><h2>{props.title}</h2><h3>{props.subtitle}</h3>
                </Link><ButtonPlus /><ButtonMinus /><div>Total: {totalVote}</div>
                <div className="by-who">By {owner}</div>
                </div>
            }
    else if (props.whole === false){
        return <div className="demotMini">
                <div className="demot-small">
                    <img alt="demot" className="demot-small-img" src={props.image} /><h4>{props.title}</h4><h6>{props.subtitle}</h6>
                </div>
                </div>
    }
}

export default Demot