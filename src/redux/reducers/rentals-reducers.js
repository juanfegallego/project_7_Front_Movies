import { RENTALS } from '../type';
const initialState =
    'profile'
;
const rentals = (state = initialState, action) => {
    switch(action.type){
        case RENTALS:
            return action.payload;

        default :
            return state
    }
}
export default rentals;