import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'




function Register() {
  const [img, setImg] = useState('')
  const dispatch = useDispatch()
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


  const [values, setValues] = useState({
    email: '',
    password: '',
    profile: ''
  })

  

  const naviagate = useNavigate()
  const generateErrors = (err) => {
    toast.error(err, { position: 'top-right' })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:4000/register", {
        ...values, img,
      }, { withCredentials: true });

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateErrors(email)
          else if (password) generateErrors(password)
        } else {
          naviagate('/login')
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div> <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={(e) => { submitHandler(e) }}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' placeholder='Email' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' placeholder='Password' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>

        <button type='submit' >Submit</button>
        <span>
          Already have an account <Link to='/login' >Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  )
}

export default Register