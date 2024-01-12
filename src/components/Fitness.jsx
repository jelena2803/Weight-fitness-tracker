import React from "react";

function Fitness() {
    return (
        <div className="profile-form">
            <div className="add-new-data">
                <button>Add weight</button>
                <button>Add fitness activity</button>
            </div>

            <div className="fitness-container">
                <p className="item title">Date</p>
                <p className="item title">Activity</p>
                <p className="item title">Duration</p>
                {/* <p className="fitness-data">Delete button</p> */}
                <hr />
            </div>

        </div>
    )
}

export default Fitness