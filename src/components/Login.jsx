import React from "react";

function Login() {
    return (
    

            <div className="profile-form">
                <div className="init-profile-form">
                    <div>
                        <label htmlFor="email">Your email:</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                </div>

                <button>Log in</button>
            </div>
        
    );
}

export default Login;