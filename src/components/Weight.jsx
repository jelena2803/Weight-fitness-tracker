import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Weight() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    let [weightList, setWeightList] = useState([]);
    let [currentDate, setCurrentDate] = useState("");
    let [currentWeight, setCurrentWeight] = useState(0);
    let [BMI, setBMI] = useState(0);
    let token = localStorage.getItem("token");
    const headers = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };

    // useEffect(() => {
    //     axios.get("http://localhost:3636/weight").then(({ data }) => {
    //         // console.log(data);
    //         setWeightList(data);
    //     })
    // }, []);

    function getWeight() {
        try {
            console.log("weight requested front")
            axios.get("http://localhost:3636/weight", { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data }) => {
                    setWeightList(data);
                    console.log(weightList);
                })
        } catch (error) {
            console.log(error);
        }
    }

    function handleInputChange (e) {
        setCurrentWeight(e.target.value);
        calcBMI();
        getCurrentDate();
    }


    function calcBMI() {
        let kg = currentWeight;
        let result = ((kg / (user.height * user.height)).toFixed(2))*10;
        setBMI(result);
        console.log("bmi", BMI);
    }

    function getCurrentDate() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        const month = months[today.getMonth()];
        //   const monthNum = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        setCurrentDate(month + " " + date + " " + year);
        // return currentDate;
    }

    function addNewWeight() {
        axios.post("http://localhost:3636/weight", {
            userId: user._id,
            date: currentDate,
            weight: currentWeight,
            BMI: BMI,
        }, headers).then(({ data }) => {
            if (data) {
                console.log("new weight sent");
                getWeight();
            }
            else {
                console.log(" new weight not sent")
            }

        })
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            getWeight();
            // axios.get("http://localhost:3636/weight" + user._id).then(({ data }) => {
            //     console.log(data);})
        } else {
            navigate("/login");
        }
    }, []);



    return (
        <div className="profile-form ">

            <div className="add-new-data">
                <div className="init-profile-form">
                    <div>
                        <label htmlFor="weight">My new weight:</label>
                        <input type="number" id="weight" value={currentWeight} placeholder="60" step="1" onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>
                <button onClick={() => { addNewWeight() }}>Add weight</button>
                <button> <NavLink to={"/fitness"} className={"logs"}> My activities </NavLink> </button>
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