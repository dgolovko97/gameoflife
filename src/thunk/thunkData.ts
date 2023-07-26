export const getHistoryListThunk = (params) => (dispatch) => {
  dispatch({ type: "LOADING_HISTORY", payload: "loadingType" });
  const promise = Promise.resolve(["Получены какие-то данные с сервера"]);

  promise.then((data) => {
    setTimeout(() => {
      dispatch({
        type: "GET_HISTORY_LIST",
        payload: { data: data },
      });
    }, 4000);
  });
};
