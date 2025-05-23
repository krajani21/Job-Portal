import axios from "axios";
import { JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_SUCCESS, JOB_TYPE_LOAD_FAIL } from "../constants/jobTypeConstant";

export const jobTypeLoadAction =() => async(dispatch) =>{
    dispatch({type: JOB_TYPE_LOAD_REQUEST});
    try {
        const data = await axios.get("/api/type/jobs");
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data.data
        });
        
    } catch (error) {
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
        
    }

}