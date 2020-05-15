import { FETCH_NEWS } from "../actions/news";

const intialState = {
  allNews: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        allNews: action.newses,
      };
  }
  return state;
};
