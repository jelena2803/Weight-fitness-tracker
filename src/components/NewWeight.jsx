import React from "react";
// import { useState } from "react";
import axios from "axios";

function NewWeight() {

    // function addNewWeight() {
    //     axios.post("http://localhost:3636/weight", {
    //         weight: 32,
    //         BMI: null,
    //     }).then((data) => {
    //         console.log(data);
    //         // getWeight();
    //     })
    // }

    return (
        <>
            <div className="init-profile-form">
                <div>
                    <label htmlFor="weight">My new weight:</label>
                    <input type="number" id="weight" placeholder="60" step="5" />
                </div>
            </div>
            <button >Add weight</button>
            <button>My weight log</button>
        </>

    )
}

export default NewWeight;