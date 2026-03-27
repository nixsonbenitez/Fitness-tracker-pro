const API = import.meta.env.VITE_API;


export async function getRoutines(){
    try{
        const response = await fetch(API + "/routines");
        const result = await response.json();
        return result;
    } catch (e) {
        console.error(e)
        return[];
    }
}

// the get routines function here is fetching the routines api, what is different 
//between this and the getActivities is the name, which matters when working with different 
// sets of information

export async function getRoutine(id) {
    try{
        const response = await fetch(API + "/routines/" + id);
        const result = await response.json();
        return result;
    }catch(e){
        console.error(e)
        return[];
    }
}

//here we are getting the id of routines.

export async function createRoutine(token, routine){
    if(!token) {
        throw Error("You must be signed in to create a routine")
    }

    const response = await fetch (API + "/routines", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(routine),
    });
    if(!response.ok) {
        const result = await response.json();
        throw Error(result.message);
    }
}

// There is a couple of things happening here. 
//When we have no token you throw a message saying to sign in .
// Otherwise if the token is there we can send datas to the server via POST
// turn routine which is inside the paranthises from a object into a string for our API
//!response.ok here is saying if it is not successful display the message to the user 
// so we can see the problem at had. 

export async function deleteRoutine(token, id) {
    if (!token) {
        throw Error("You can't delete as you must be signed in.")
    }
    const response = await fetch (API + "/routines/" + id, {
    method: "DELETE",
    headers: {Authorization: "Bearer " + token},
    });
    if (!response.ok) {
        const result = await response.json();
        throw Error(result.message);
    }
}

// This is similiar to the POST method, but the code here is requiring a token and an Id
// if a user has a token the method will be delete and it will be sent to the server.
// if the users has authorization which is token. If anything wrong happens to display the error message in
// the console. 

// Everything I am building below is going to be for sets as it requires us to fetch different info
// from our API. 

export async function addSet (token, routineId, set) {
    if (!token) {
        throw Error("You must be signed in to add a set.")
    }
    const response = await fetch (API + "/sets",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            routineId,
            activityId: set.activityId,
            count: set.count})
    });
    if(!response.ok){
        const result = await response.json();
        throw Error(result.message)
    }
}
// To add a set we are doing a post method and requiring the user to have a token. 
// This one also is tricky and here is how in body: JSON.Stringify since I am working 
//with three key information items which is the routineId the set we are adding into.
// the body which has routineID, activityID, and count is what is being sent to the API
// activity ID and count grabs the info from inside the set object. which is why it has dot notation

export async function deleteSet(token, setId){
    if(!token) {
        throw Error("You can't delete a set when you are not logged in")
    }
    const response = await fetch (API + "/sets/" + setId, {
        method: "DELETE",
        headers: {Authorization: "Bearer " + token},
    });
    if(!response.ok) {
        const result = await response.json();
        throw Error(result.message)
    }
}

// Here the delete set is different as we are identifying the setId and not the id of the routine 
// adding this here give specification for that request. A token is also required here