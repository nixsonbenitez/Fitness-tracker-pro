import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router"
import {useAuth} from "../auth/AuthContext"
import {getRoutine, deleteRoutine, addSet, deleteSet} from "../api/routine"
import {getActivities} from "../api/activities"

export default function RoutineDetail(){
    const {id} = useParams(); //This grabs the id from the url
    const navigate = useNavigate();
    const {token} = useAuth();

    const [routine, setRoutine] = useState(null);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRoutine(id).then(setRoutine);
        getActivities().then(setActivities);
    },[id]);
    //two fetches happening which is the routine setails and the activites drop down.

    const tryDelete = async () => {
        setError(null);
    try {
        await deleteRoutine(token, id);
        navigate("/routines")
    }catch (e){
        setError(e.message)
    }};

    const tryAddSet = async (formData) => {
        setError(null);
        const activityId = Number(formData.get("activityId"));
        const count = Number(formData.get("count"));
        try {
            await addSet(token,id,{activityId,count});
            getRoutine(id).then(setRoutine);
        } catch (e) {
            setError(e.message)
        }
    }
    // what tryAddSet does is it grabs Numbers and converts the values from strings to numbers as the API expects it. the token here provens the user is logged in and the API makes the request to add a set 
    //
    //

    if(!routine) return <p>Loading...</p>
    return (
        <div className="detail-routine">
            <div className="detail-routine-header"> 
            <h1>{routine.name}</h1>
            <p>Goal: {routine.goal}</p>
            <p>Created by: {routine.creatorName}</p>
            {error && <p role="alert">{error}</p>}
            </div>
            {token && <button onClick={tryDelete} className="delete-btn"> Delete Routine</button>}
        <h2>Sets</h2>
        {routine.sets.length === 0 ? (
            <p>No sets yet! Add one below.</p>):(
                <ul>
                    {routine.sets.map((set) => (
                        <li key={set.id} className="set-item">
                           <span className="set-pill"> {set.activityName} - {set.count} reps </span>
                            {token && (
                                <button className="delete-set-btn" onClick={() => deleteSet(token, set.id).then(() =>getRoutine(id).then(setRoutine))}>Delete Set
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )
    
    
}

{token && (
        <form action ={tryAddSet} className="routine-form">
        <label>Activity
            <select name ="activityId">
                {activities.map((activity) => (
                    <option key ={activity.id} value={activity.id}>
                        {activity.name}
                    </option>
                ))}
            </select>
        </label>
        <label>
        Count
        <input type="number" name="count" required/>
        </label>
        <button>Add Set</button>
        </form>
    )}
</div>  
)

    // h1 note: The return here will be the data that comes from the api the details of course, the goal and created by will show for all users. But the token, here when present will allow users to delete if the condition of the token being present is true
    //h2 note: displays data of the set and if the user with a token wanted to delete the the it would call the id and send that over to setRoutine to update the state.
    //FORM NOTE: The form here is for the use this allows the user to click on an activity. add a set and reps and submit it!
    

}