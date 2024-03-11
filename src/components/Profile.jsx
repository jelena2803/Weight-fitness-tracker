import React from "react";
// import NewActivity from "./NewActivity";
// import NewWeight from "./NewWeight";
// import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate} from "react-router-dom";


function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="profile-form">
            <p className="profile-data">Username: {user.username}</p>
            <p className="profile-data">Gender: {user.gender}</p>
            <p className="profile-data">Age: {user.age}</p>
            <p className="profile-data">Height: {user.height}</p>

            <hr />

            <div className="add-new-data">
                {/* <NewWeight /> */}

                <div className="init-profile-form">
                    <div>
                        <label htmlFor="weight">My new weight:</label>
                        <input type="number" id="weight" placeholder="60" step="5" />
                    </div>
                </div>

                <button >Add weight</button>
                <button><NavLink to={"/weight"} className={"logs"}>My weight log</NavLink></button>

                <hr />
                <div className="init-profile-form">
                    <div>
                        <label htmlFor="activity">New activity:</label>
                        <input type="text" id="activity" placeholder="Enter new activity" />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration in minutes:</label>
                        <input type="number" id="duration" placeholder="30" step="5" />
                    </div>
                </div>
                <button>Add new activity</button>
                <button><NavLink to={"/fitness"} className={"logs"}>My activities</NavLink></button>
            </div>
        </div>

    )
}

export default Profile;