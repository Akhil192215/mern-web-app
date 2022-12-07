
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios'

function EditUser() {
    const [img, setImg] = useState('')
    const location = useLocation()
    function previewFile() {
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }


        reader.addEventListener("load", () => {
            // convert image file to base64 string
            preview.src = reader.result;
            setImg(reader.result)
            console.log(reader.result);
        }, false);

    }


    const [user, setUser] = useState('')
    const [edituser, setEditUser] = useState({})
    const [values, setValues] = useState({
        email: '',
    })



    useEffect(() => {
        axios.get('http://localhost:4000/admin-dashboard').then((data) => {
            setUser(data.data);
        })
    }, [])

    const [state, setState] = useState({
        email: '',
        profile: ""
    })
    const naviagate = useNavigate()
    const generateErrors = (err) => {
        toast.error(err, { position: 'top-right' })
    }
    const userId = location.state.id
    const emailHandler = (e) => {
        console.log(e.target.value);
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData2 = new FormData()
        formData2.append('id',userId)
        formData2.append('email', state.email)
        formData2.append('file', state.profile)
        
        console.log(state.profile);
        console.log(...formData2);
        let url = "http://localhost:4000/updateUser"


        await axios.post(url, formData2, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(response => {
                console.log(response);
                naviagate('/admin-dashboard')
            })
            .catch(error => {
                console.log(error);
            });



    }
  
    console.log(userId);
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/editUser',
            data: {
                id: userId
            }
        }).then((data) => {
            setEditUser(data.data)
        })

    }, [])


    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:4000/editUser',
            data: {
                id: userId
            }
        });
    }, [])

    const imageHandler = (e) => {

        setState({ ...state, profile: e.target.files[0] })
    }

    return (
        <div> <div className="container">
            <h2>Edit {location.id}</h2>
            <div>email:{edituser.email}</div>
            <br />
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Enter new email</label>
                    <input type="email" name='email' placeholder='Email' onChange={emailHandler} />
                </div>
                <img width={100} src={`http://localhost:4000/userProfiles/${edituser.profile}`} alt="" />
                <input type="file" name='file' onChange={imageHandler} />

                <button type='submit' >Submit</button>
            </form>
            <ToastContainer />
        </div>
        </div>
    )
}

export default EditUser