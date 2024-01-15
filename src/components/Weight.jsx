import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Weight() {

    let [weightList, setWeightList] = useState([]);
    let [currentDate, setCurrentDate] = useState("");
    let [currentWeight, setCurrentWeight] = useState(0);
    let [BMI, setBMI] = useState(0);

    // useEffect(() => {
    //     axios.get("http://localhost:3636/weight").then(({ data }) => {
    //         // console.log(data);
    //         setWeightList(data);
    //     })
    // }, []);

    function getWeight() {
        axios.get("http://localhost:3636/weight").then(({ data }) => {
            // console.log(data);
            setWeightList(data);
        })
    }

    function calcBMI() {
        let kg = currentWeight;
        let result = (kg / (1.52 * 1.52)).toFixed(1);
        setBMI(result);
    }

    function getCurrentDate() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        const month = months[today.getMonth()];
        //   const monthNum = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        setCurrentDate(month + " " + date + " " + year);
        return currentDate;
    }

    function addNewWeight() {
        getCurrentDate();
        calcBMI();
        axios.post("http://localhost:3636/weight", {
            date: currentDate,
            weight: currentWeight,
            BMI: BMI,
        }).then((data) => {
            getWeight();
        })
    }

    useEffect(() => {
        getWeight();
    }, []);

    return (
        <div className="profile-form ">

            <div className="add-new-data">
                <div className="init-profile-form">
                    <div>
                        <label htmlFor="weight">My new weight:</label>
                        <input type="number" id="weight" placeholder="60" step="1" onChange={(e) => setCurrentWeight(e.target.value)} />
                    </div>
                </div>
                <button onClick={() => { addNewWeight() }}>Add weight</button>
                {/* <button>Add fitness activity</button> */}
            </div>

            <div className="weight-container">
                <p className="item title">Date</p>
                <p className="item title">Weight (kg)</p>
                <p className="item title">BMI</p>
                <hr />

                {weightList.map((e) => {
                    return (
                        <> <p className="item">{e.date}</p>
                            <p className="item">{e.weight}</p>
                            <p className="item">{e.BMI}</p>
                        </>
                    )
                }
                )}
            </div>

        </div>
    )
}

export default Weight;