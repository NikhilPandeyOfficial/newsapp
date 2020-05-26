import {
  FETCH_NEWS,
  SAVE_NEWS,
  FETCH_SAVED_NEWS,
  UNSAVE_NEWS,
} from "../actions/news";

const intialState = {
  allNews: {},
  //key value pairs in savedNews
  savedNews: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        allNews: action.newses,
      };

    case SAVE_NEWS:
      // console.log("prev saved : ---", state.savedNews);
      // console.log("coming saved : ----", action.savedNews);
      const { newsId, savedNews } = action;
      return {
        ...state,
        savedNews: { ...state.savedNews, newsId: savedNews },
      };

    case FETCH_SAVED_NEWS:
      return {
        ...state,
        savedNews: action.newses,
      };

    case UNSAVE_NEWS:
      const updatedSavedNews = {};
      Object.keys(state.savedNews).forEach((element) => {
        if (action.newsId != element) {
          updatedSavedNews[element] = state.savedNews[element];
        }
      });
      return {
        ...state,
        savedNews: updatedSavedNews,
      };
  }
  return state;
};
