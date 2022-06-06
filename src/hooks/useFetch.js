import { useEffect } from "react"

const useFetch = (url) => {
    useEffect(() => {
        console.log(url)
    }, [url])

    const fetchData = (url, opts) => {
        fetch(url, opts)
        .then((res) => {
            if (!res.ok) {
              throw new Error();
            }
            return res.json();
          })
        .then((res) => {
            return res
          })
        .catch((error) => {
            return error
        });
    }
};

export default useFetch