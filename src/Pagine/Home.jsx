import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Home() {
    const navigate=useNavigate();
    const [nSiga,setNSiga]=useState();

    useEffect(() => {
      if(localStorage.getItem("IDSiga")===undefined||localStorage.getItem("IDSiga")===null) {
        navigate("/Login")
      }
    
      
    }, [])
    
    return (
    <div>Home</div>
  )
}

export default Home