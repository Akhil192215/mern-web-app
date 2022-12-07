import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'


function CreateUser() {
 const [img, setImg] = useState('')

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

  const [state, setState] = useState({
    email: '',
    password:'',
    profile: ""
})

const emailHandler = (e) => {
  console.log(e.target.value);
  setState({ ...state, [e.target.name]: e.target.value })
}
const passwordHandler = (e) => {
  console.log(e.target.value);
  setState({ ...state, [e.target.name]: e.target.value })
}
  const naviagate = useNavigate()
  const generateErrors = (err) => {
    toast.error(err, { position: 'top-right' })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    const formData2 = new FormData()
    formData2.append('email', state.email)
    formData2.append('password', state.password)
    formData2.append('file', state.profile)
    
    console.log(state.profile);
    console.log(...formData2);
    let url = "http://localhost:4000/createUser"


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

  const imageHandler = (e) => {

    setState({ ...state, profile: e.target.files[0] })
}
  return (
    <div> <div className="container">
      <h2>Create user</h2>
      <form onSubmit={(e) => { submitHandler(e) }}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' placeholder='Email' onChange={emailHandler} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' placeholder='Password' onChange={passwordHandler} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="file" name='file' onChange={imageHandler} />
        </div>
    
        <button type='submit' >Submit</button>
      </form>
      <ToastContainer />
    </div>
    </div>
  )
}

export default CreateUser