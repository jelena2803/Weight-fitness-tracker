import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userAge, setUserAge] = useState("");
    const [userHeight, setUserHeight] = useState("");
    const [error, setError] = useState("");

    function signup() {
        axios.post("http://localhost:3636/", {username : username, password : password, age : userAge, gender : userGender, height : userHeight,})
        .then(({data}) => {
            if (data.msg === "user created successfully") {
                //redirect the user to the login page
                navigate("/login");
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
<p>Additional information</p>
                    <div>
                    <label htmlFor="gender">Your gender:</label>
                    <input type="text" id="gender" placeholder="Male or Female" onChange={(e) => setUserGender(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="age">Your age:</label>
                    <input type="number" id="age" onChange={(e) => setUserAge(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="height">Your height in meters, like in the example</label>
                    <input type="number" placeholder="1.65" id="height" min="1" max="3" step="0.01" onChange={(e) => setUserHeight(e.target.value)} required/>
                </div>
                </div>

                <p>{error}</p>
                <button onClick={() => signup()}>Sign up</button>

                <p>Already have an account? <Link to={`/login`}>Log in</Link></p>
            </div>
    );
}

export default Signup;