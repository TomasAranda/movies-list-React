import axios from 'axios';

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export function moviesApiCall(query) {
  return new Promise(async (resolve, reject) => {
    const CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    const searchUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s='${query}'`;
    try {
      if (source.current) source.current.cancel('Cancelled unnesessary request'); // Cancel the previous request before making a new request
      
      source.current = CancelToken.source(); // Create a new CancelToken

      let { data } = await axios.get(searchUrl,
        { cancelToken: source.current.token }
      );
      if (data.Response === "False") {
        data = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&t='${query}'`,
          { cancelToken: source.current.token }
        );
      }
      if (data.Response === "False") return;
      resolve(data.data ? data.data : data);
    } catch (error) {
      if (axios.isCancel(error) || error) console.warn('Request canceled', error.message); // Handle if request was cancelled
      else {
        // Handle usual errors
        console.error('Something went wrong: ', error.message)
        reject(error.message)
      }
    }
  })
}

const instance = axios.create();

export function setTokenHeader(token) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    instance[method.toLowerCase()](path, data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (err.request.status >= 500) reject({ message: "Sorry, the server is down. Please try again later" });
        reject(err.response.data.error || "Oops, something went wrong");
      })
  })
}