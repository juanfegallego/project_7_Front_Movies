import {combineReducers} from 'redux';
import credentials from './credential-reducers';
import movie from './movie-reducer';




const rootReducer = combineReducers({
    credentials,
    movie,
    

});

export default rootReducer;