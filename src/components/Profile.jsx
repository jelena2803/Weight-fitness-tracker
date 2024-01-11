import React from "react";

function Profile() {
    return (
        <div className="profile-form">
            <p className="profile-data">Username:</p>
            <p className="profile-data">Gender:</p>
            <p className="profile-data">Age:</p>
            <p className="profile-data">Height:</p>
            <p className="profile-data">BMI:</p>

            <div className="add-new-data">
                <button>Add weight</button>
                <button>Add fitness activity</button>
            </div>


        </div>
    )
}

export default Profile