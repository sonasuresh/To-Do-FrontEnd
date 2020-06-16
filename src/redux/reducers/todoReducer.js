import { DESCRIPTION, DUEDATE, ASSIGNEDTO } from '../../actions/types'

const initialState = {
    description: '',
    duedate: new Date(),
    assignedto: '',
    assignedUserName: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DESCRIPTION:
            return {
                ...state,
                description: action.payload
            }
        case DUEDATE:
            return {
                ...state,
                duedate: action.payload
            }
        case ASSIGNEDTO:
            return {
                ...state,
                assignedto: action.payload.assignedto,
                assignedUserName: action.payload.assignedUserName
            }
        default:
            return state;
    }
}