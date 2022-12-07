import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AppContext } from '../AppContext'
export default function Cards() {
  const value = useContext(AppContext)

  const [imgData, setImgData] = useState()

  const id = 'secret'
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast('Logout successfully', {
            toastId: id,
            theme: "light",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  const profile = () => {

    navigate("/user");
  };
  useEffect(() => {
    setImgData(value)
  }, [value])


  return (

    <>
      <div className="private">
        <div className="userName">
        <h4>Welcome user </h4>
        </div>
      

        {/* <img key={value}  src={`http://localhost:4000/userProfiles/${imgData}`} style={{ width: 250, borderRadius: '500px' }} alt="" />
        <button onClick={logOut}>Log out</button>
        <button onClick={profile}> Update Profile</button> */}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}