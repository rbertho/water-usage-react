import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

import '../App.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate(); 

    function handleSubmit(e) {
        e.preventDefault()
        console.log(document.getElementById('errordiv'))
        document.getElementById('errordiv').innerHTML = ''
        console.log(document.getElementById('errordiv'))
        axios.post('https://smart-water-rodrigos-projects-f9ec54f8.vercel.app/login', {email, password})
        .then((response) => { 
            console.log('Login success!')
            console.log(response.data)
            Cookies.set('access_token', response.data[0].email)
            Cookies.set('id_device', response.data[0].id_device)
            window.location.href = '/'
        })
        .catch((error) => {
            console.log('Login Failed!')
            document.getElementById('errordiv').innerHTML = 'Email ou senha incorretos!'
            console.log(document.getElementById('errordiv'))
            console.log(error)
        })
    }

    function showCookieValue() {
        //alert('Cookie value is: ' + Cookies.get('access_token'))
        //console.log('Cookie value is: ' + Cookies.get('access_token'))
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-secondary'>
            <div className="card">
                <form id="loginForm" className="loginform" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input id="email" type="email" placeholder="Enter email" 
                        className="form-control" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input id="password" type="password" placeholder="Enter password"  
                        className="form-control w-100" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-success mt-3" onClick={showCookieValue}>Login</button>
                    </div>
                    <div className="errordiv" >
                        <div className="errortext" id="errordiv">  
                        </div>
                    </div>
                    <br />
                    <button type="button" className="btn-about" onClick={() => {navigate('/about')}}  >About</button>
                </form>
            </div>
        </div>
    )
}

export default Login; 