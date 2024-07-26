import axios from "axios";

// swr is not going to do any fetching, its just going to handel loading, error and data states for you
// therefore it needs a function to do fetching which uses axios
const fetcher = <T>(url: string, headers = {}): Promise<T> =>
  axios
    .get<T>(url, {
      headers: headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export default fetcher;
// make sures that cookies are sent along the request
