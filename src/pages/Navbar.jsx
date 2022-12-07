import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../CSS/nav.css'
import { AppContext } from '../AppContext'
import { Navigate, useNavigate } from 'react-router';
import { useCookies } from "react-cookie";

function Navbar() {
  const navigate = useNavigate();
  let value = useContext(AppContext)
  const [imgName, setImgName] = useState('1670229136895-PngItem_5040528.png')
useEffect(()=>{
  setImgName(value)
})

  const [cookies, setCookie, removeCookie] = useCookies([]);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  const profile = () => {
    navigate("/user");
  };
  return (
    <>
      <ul className='nav'>

        <div className='container-1'>
          <div className="nav-items">
            <h2 className='logo'>Logo</h2>
            <li className='nav-list'>Home</li>
            <li className='nav-list'>About</li>
            <li className='nav-list'>Contact</li>
            <li className='nav-list'>Login</li>
          </div>
          <div className="user">
            {/* {value ? <img onClick={profile} className='profile' src={`http://localhost:4000/userProfiles/${imgName}`} alt="" /> : <img onClick={profile} className='profile' src={'http://localhost:4000/userProfiles/1670229136895-PngItem_5040528.png'} alt="" />} */}
            <img onClick={profile} className='profile' src={`http://localhost:4000/userProfiles/${imgName}`} alt="" />
            <button onClick={logOut} className='logout'>Logout</button>
          </div>
        </div>
      </ul>
    </>

  )
}

export default Navbar