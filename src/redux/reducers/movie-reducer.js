import { ADD_MOVIE } from "../type";

const initialState = {
  
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE:
      return action.payload;

    default:
      return state;
  }
};

export default movieReducer;