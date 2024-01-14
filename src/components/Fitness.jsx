import React from "react";
import axios from "axios";
import { useEffect , useState } from "react";

function Fitness() {
    let [fitnessList, setFitnessList ] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3636/fitness").then(({data}) => {
            console.log(data);
            setFitnessList(data);
        })
    }, []);

    return (
        <div className="profile-form">
            <div className="add-new-data">
                <button>Add weight</button>
                <button>Add fitness activity</button>
            </div>

            <div className="fitness-container">
        
                <p className="item title">Date</p>
                <p className="item title">Activity</p>
                <p className="item title">Duration (in minutes)</p>
                {/* <p className="fitness-data">Delete button</p> */}
                <hr />

                {fitnessList.map((e)=> {
                    return (
                        <> <p className="item ">{e.date.split("T")[0]}</p>
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