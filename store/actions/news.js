export const FETCH_NEWS = "FETCH_NEWS";

import keys from "../../config/keys";

const fetchNewsGen = async (category) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${keys.API_KEY}`
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
