import { FETCH_PROJECT_FAILURE, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS } from "./projectTypes"
import axios from 'axios'
export const fetchProjectRequest = () => {
    return {
        type: FETCH_PROJECT_REQUEST 
    }
}

export const fetchProjectSuccess = projects => {
    return {
        type: FETCH_PROJECT_SUCCESS, 
        payload: projects
    }
}

export const fetchProjectFailure = error => {
    return {
        type: FETCH_PROJECT_FAILURE, 
        payload: error
    }
}

export const updateProjectRequest = () => {
    return {
        type: UPDATE_PROJECT_REQUEST 
    }
}

export const updateProjectSuccess = projects => {
    return {
        type: UPDATE_PROJECT_SUCCESS, 
        payload: projects
    }
}

export const updateProjectFailure = error => {
    return {
        type: UPDATE_PROJECT_FAILURE, 
        payload: error
    }
}

export const fetchProjects = () => {
    return (dispatch) => {
        dispatch(fetchProjectRequest)
        // console.log("am in");
        axios.get("http://localhost:5000/project")
        .then((response) => {
            console.log({response});
            dispatch(fetchProjectSuccess(response.data))
        })
        .catch((error) => {
            console.log({error});
            dispatch(fetchProjectFailure(error.message))
        });
    }
}
export const updateProject = (id,postData) => {
    console.log("in action",id,postData);
    return (dispatch) => {
        dispatch(updateProjectRequest)
        console.log("am in update");
        axios.patch(`http://localhost:5000/project/${id}`,postData)
        .then((response) => {
            console.log({response});
            dispatch(updateProjectSuccess(response.data))
        })
        .catch((error) => {
            console.log({error});
            dispatch(updateProjectFailure(error.message))
        });
    }
}