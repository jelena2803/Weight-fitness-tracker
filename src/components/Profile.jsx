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

                {/* <div className="weight-container">
                <p className="item title">Date</p>
                <p className="item title">Weight</p>
                <p className="item title">BMI</p>
                <hr />

                {weightList.map((e)=> {
                    return (
                        <> <p className="item ">{e.date.split("T")[0]}</p>
                        <p className="item ">{e.weight}</p>
                        <p className="item ">{e.BMI}</p>
                        </>
                    )
                }
                )}
            </div> */}
                <hr />

                <NewActivity />
                <button>Add new activity</button>
                <button>My activities</button>
            </div>
        </div>

    )
}

export default Profile;