import {combineReducers} from 'redux';
import credentials from './credential-reducers';


const rootReducer = combineReducers({
    credentials,

});

export default rootReducer;