import React from "react";

function Weight() {
    return (
        <div className="profile-form ">

            <div className="add-new-data">
                <button>Add weight</button>
                <button>Add fitness activity</button>
            </div>

            <div className="weight-container">
                <p className="item title">Date</p>
                <p className="item title">Weight</p>
                <p className="item title">BMI</p>
                <hr />
            </div>

        </div>
    )
}

export default Weight