import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router";
import {getActivity, deleteActivity} from "../api/activities"
import {useAuth} from "../auth/AuthContext"


export default function ActivityDetail(){
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        getActivity(id).then(setActivity);
    }, [id]);

    const tryDelete = async () => {
        try{
            await deleteActivity(token, id);
            navigate("/")
        } catch (e) {
            console.error(e)
        }
    }

    if (!activity) return <p> Loading...</p>


    // What this function is doing and what the return does is the function 
    // requires a token and an ID for it to be activitated, otherwise set
    // set activity in a null state. useEffect here fires automatically when the component loads, 
    // so as soon as the page loads go fetch the data.. 
    // the delete button here fetches the id and confirms it after the user requests it 
    // it also confirms if the user in this case has the token
    // return here is how we want to present ActivityDetail in the frontend
    console.log(activity);
    return(
        <div> 
            <h1>{activity.name}</h1>
            <p>{activity.description}</p>
            <p>Created by: {activity.creatorName}</p>
            {token && <button onClick={tryDelete}>Delete</button>}
        </div>
    )
}