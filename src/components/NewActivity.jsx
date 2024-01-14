import React from "react";

function NewActivity() {
    return (
        <>

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

        </>

    )
}

export default NewActivity;