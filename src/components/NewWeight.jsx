import React, { useState } from "react";

function NewWeight() {

    const [newWeight, setNewWeight] = useState(null);

    // function addNewWeight(){

    // }

    return (
        <>
            <div className="init-profile-form">
                <div>
                    <label htmlFor="weight">My new weight:</label>
                    <input type="number" id="weight" placeholder="60" step="5" /></div>
            </div>
        </>

    )
}

export default NewWeight;