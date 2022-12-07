import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router';

function UserProfile({ name }) {
    console.log(name);
    let imgPath;
    const [imgName, setImgName] = useState()
    const [state, setState] = useState({
        profile: ''
    })
    const navigate = useNavigate()
    const imageHandler = (e) => {

        setState({ ...state, profile: e.target.files[0] })
    }

    const uploadHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', state.profile)
        formData.append('name', "hello")
        console.log(...formData, "-------------------------------");
        const { data } = await axios.post("http://localhost:4000/user", formData)
        imgPath = '1669915027342-pexels-jonathan-borba-9703870.jpg'
        setImgName(data)
        name(data)
        console.log(data, '=================================');
    }

    const arry = [];
    arry.push(imgName)
    let path = arry[Array.length - 1]
    const obj = {}
    obj.val = arry[Array.length - 1] ? arry[Array.length - 1] : arry[Array.length - 2]
    console.log(arry);
    const updatePro = () => {
        setTimeout(() => {
            navigate("/");
        }, 2000)

    }
    return (
        <div>
            <form onSubmit={uploadHandler}>
                <div>
                    <img src={`http://localhost:4000/userProfiles/${imgName}`} style={{ width: 250, borderRadius: '500px' }} alt="" />
                    <label htmlFor="password">Password</label>
                    <input type="file" name='image' onChange={imageHandler} />
                </div>
                <button onClick={updatePro} type='submit' >Update</button>
            </form></div>
    )
}

export default UserProfile