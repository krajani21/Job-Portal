export const loadJobTypeReducer = (state={jobType:[]}, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return {loading: true}

        case JOB_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobType
            }

        case JOB_TYPE_LOAD_FAIL:
            return{
                loading: false,
                error: action.payload
            }

            case JOB_TYPE_LOAD_RESET:
            return{}
    
        default:
            return state
    }

}