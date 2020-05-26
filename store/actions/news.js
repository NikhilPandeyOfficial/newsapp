export const FETCH_NEWS = "FETCH_NEWS";
export const SAVE_NEWS = "SAVE_NEWS";
export const FETCH_SAVED_NEWS = "FETCH_SAVED_NEWS";
export const UNSAVE_NEWS = "UNSAVE_NEWS";

import keys from "../../config/keys";

const fetchNewsGen = async (category) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${keys.NEWS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("something went wrong!");
  }

  const resData = await response.json();
  const categoryNews = resData.articles;
  return categoryNews;
};

export const fetchNews = () => {
  return async (dispatch, getState) => {
    try {
      const categories = [
        "general",
        "business",
        "entertainment",
        "health",
        "sports",
        "science",
      ];
      const allCategoryNews = {};
      for (var i = 0; i < 6; i++) {
        const temp = await fetchNewsGen(categories[i]);
        allCategoryNews[categories[i] + "News"] = temp;
      }

      dispatch({
        type: FETCH_NEWS,
        newses: allCategoryNews,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const saveNews = (news) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://newsapp-c0489.firebaseio.com/savednewses/${userId}.json?auth=${token}`,
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(news),
        }
      );
      const resData = await response.json();

      dispatch({
        type: SAVE_NEWS,
        newsId: resData.name,
        savedNews: news,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const unSaveNews = (newsId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://newsapp-c0489.firebaseio.com/savednewses/${userId}/${newsId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("something went wrong on 'UnSaving' !");
    }

    dispatch({ type: UNSAVE_NEWS, newsId: newsId });
  };
};

export const fetchSavedNews = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://newsapp-c0489.firebaseio.com/savednewses/${userId}.json`
      );

      const resData = await response.json();

      dispatch({
        type: FETCH_SAVED_NEWS,
        newses: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};
