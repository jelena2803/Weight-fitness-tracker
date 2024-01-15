import React from "react";

function CompleteProfile() {
    return (
        <div className="profile-form">
            <div className="init-profile-form">
                <div>
                    <label htmlFor="gender">Your gender:</label>
                    <input type="text" id="gender" placeholder="Male or Female" />
                </div>

                <div>
                    <label htmlFor="age">Your age:</label>
                    <input type="number" id="age" /></div>
                <div>
                    <label htmlFor="height">Your height in centimeters, like in the example</label>
                    <input type="number" placeholder="165" id="height" min="1" max="3" step="0.01" /></div>
            </div>
            <button>Complete your profile</button>
        </div>
    );
}

export default CompleteProfile;