import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function login() {
        axios.post("http://localhost:3636/login", {
            username : username, 
            password : password,
        })
        .then(({data}) => {
            // console.log(data);
            if (data.token) {
                //save date in the local storage
                localStorage.setItem("token", JSON.stringify(data.token));
                localStorage.setItem("user", JSON.stringify(data.user));
                //redirect the user to the login page
                navigate("/profile");
            } else {
                setError(data.msg);
            }
        })
    }


    return (
            <div className="profile-form">
                <div className="init-profile-form">
                    <div>
                        <label htmlFor="username">Your username:</label>
                        <input type="text" id="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <p>{error}</p>
                <button onClick={login}>Log in</button>

                <p>Don't have an account? You need to <Link to={`/`}>sign up</Link>.</p>
            </div>
        
    );
}

export default Login;