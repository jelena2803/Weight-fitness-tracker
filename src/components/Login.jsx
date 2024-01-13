import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
            <div className="profile-form">
                <div className="init-profile-form">
                    <div>
                        <label htmlFor="username">Your username:</label>
                        <input type="text" id="username" placeholder="Enter your username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                </div>

                <button>Log in</button>

                <p>Don't have an account? You need to <Link to={`/`}>sign up</Link>.</p>
            </div>
        
    );
}

export default Login;