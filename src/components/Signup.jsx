import React from "react";

function Signup() {
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

                <button>Sign up</button>

                <p>Already have an account? Log in</p>
            </div>
    );
}

export default Signup;