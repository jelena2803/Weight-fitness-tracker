import React from "react";
import axios from "axios";
import { useEffect , useState} from "react";

function Weight() {
    let [weightList, setWeightList ] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3636/weight").then(({data}) => {
            console.log(data);
            setWeightList(data);
        })
    }, []);
    
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

                {weightList.map((e)=> {
                    return (
                        <> <p className="item ">{e.date.split("T")[0]}</p>
                        <p className="item ">{e.weight}</p>
                        <p className="item ">{e.BMI}</p>
                        </>
                    )
                }
                )}
            </div>

        </div>
    )
}

export default Weight;