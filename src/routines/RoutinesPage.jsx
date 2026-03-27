import {useState, useEffect} from "react";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import {getRoutines, createRoutine } from "../api/routine";

export default function RoutinesPage(){
    const {token} = useAuth();
    const [routines, setRoutines] = useState([]);
    const tryCreateRoutine = async (formData) => {
        const name = formData.get("name");
        const goal = formData.get("goal");
        await createRoutine(token, {name, goal});
        getRoutines().then(setRoutines)
    }
    useEffect(() => {
        getRoutines().then(setRoutines);
    }, [])

    // UseEffect tells react here to fire once the component first loads. 
    // The hook above for tryCreateRoutine will get the name and 
    // goal strings from the form below if a user decides on wanting to add something 
    // new to the routine. But it will only show if a user has a token.

    return(
        <div>
            <h1>Routines</h1>
            <ul className="routine-list">
                {routines.map((routine) => (
                    <li key={routine.id} className="routine-card">
                        <Link to ={`/routines/${routine.id}`}>{routine.name}</Link>
                    </li>
                ))}
            </ul>
            {token && (
                <form className="routine-form" action = {tryCreateRoutine}>
                    <label>
                        Name
                        <input type = "text" name="name" required/>
                    </label>
                    <label>
                        Goal
                        <input type = "text" name="goal" required/>
                    </label>
                    <button>Create Routine</button>
                </form>
            )}
        </div>
    )
}

//The purpose of RoutinesPage here is to display the form incase a user is register
//gives more things for the user to do in this page