import React from "react";
import NewActivity from "./NewActivity";
import NewWeight from "./NewWeight";

function Profile() {
    return (
        <div className="profile-form">
            <p className="profile-data">Username:</p>
            <p className="profile-data">Gender:</p>
            <p className="profile-data">Age:</p>
            <p className="profile-data">Height:</p>
            
            <hr />

            <div className="add-new-data">
                <NewWeight />
                <button>Add weight</button>
                <button>My weight log</button>

                <hr />

                <NewActivity />
                <button>Add new activity</button>
                <button>My activities</button>
            </div>
        </div>

    )
}

export default Profile;