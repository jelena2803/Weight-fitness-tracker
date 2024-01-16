import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Fitness() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [fitnessList, setFitnessList] = useState([]);
    let token = localStorage.getItem("token");
    const headers = {headers : {Authorization : "Bearer " + localStorage.getItem("token") },};
    const [activity, setActivity] = useState("");
    const [time, setTime] = useState(0);
    let [currentDate, setCurrentDate] = useState("");
    // const [error, setError] = useState("");

    function getActivities() {
        try {
            axios.get("http://localhost:3636/fitness", { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data }) => {
                    setFitnessList(data);
                    console.log(fitnessList);
                })
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            getActivities();
            // axios.get("http://localhost:3636/weight" + user._id).then(({ data }) => {
            //     console.log(data);})
        } else {
            navigate("/login");
        }
    }, []);

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

    function handleInputChange (e) {
        setActivity(e.target.value);
        getCurrentDate();
    }

    function handleTimeInput (e) {
        setTime(e.target.value);
        getCurrentDate();
    }


    function addActivity() {
        axios.post("http://localhost:3636/fitness", {
            userId: user._id,
            date: currentDate,
            activity : activity, 
            duration : time,
        }, headers ).then(({data}) => {
            if (data) {console.log("new activity sent");
            getActivities();
        } else {
                console.log(" activity not sent")
            }
            
        })
    }


    return (
        <div className="profile-form">
            <div className="add-new-data">

                <div className="init-profile-form">
                    <div>
                        <label htmlFor="activity">New activity:</label>
                        <input type="text" id="activity" placeholder="Enter new activity" onChange={(e) => handleInputChange(e)}  />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration in minutes:</label>
                        <input type="number" id="duration" value={time}  placeholder="30" step="5" onChange={(e) => handleTimeInput(e)}/>
                    </div>
                </div>

                <button onClick={() => { addActivity() }}>Add activity</button>
                <button> <NavLink to={"/weight"} className={"logs"}> My weight log </NavLink> </button>
            </div>

            <div className="fitness-container">

                <p className="item title">Date</p>
                <p className="item title">Activity</p>
                <p className="item title">Duration (in minutes)</p>
                {/* <p className="fitness-data">Delete button</p> */}
                <hr />

                {fitnessList.map((e) => {
                    return (
                        <> <p className="item ">{e.date}</p>
                            <p className="item ">{e.activity}</p>
                            <p className="item ">{e.duration}</p>
                        </>
                    )
                }
                )}
            </div>

        </div>
    )
}

export default Fitness