import { useContext, useEffect, useState } from "react";
import { stateContext } from "../Context/StateContextProvider";

function useFetchImage() {
  const {
    list,
    setList,
    loading,
    setLoading,
    error,
    setError,
    pageNumber,
    setPageNumber,
    query,
    setQuery,
  } = useContext(stateContext);
  const [hasMore, setHasMore] = useState(true);

  async function fetchData() {
    const SEARCH_API_REQUEST = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${query}&client_id=zlWMOBdrEdSuxehZGhfTzLaiaH3OZldFG67k5lSUKrU`;
    const IMAGE_API_REQUEST = `https://api.unsplash.com/photos/?page=${pageNumber}&client_id=zlWMOBdrEdSuxehZGhfTzLaiaH3OZldFG67k5lSUKrU`;

    try {
      setLoading(true);
      setError(false);
      let Response, Data;
      if (query) {
        Response = await fetch(SEARCH_API_REQUEST);
        Data = (await Response.json()).results;
      } else {
        Response = await fetch(IMAGE_API_REQUEST);

        Data = await Response.json();
      }
      setHasMore(Data.length > 0);

      if (list) {
        if (pageNumber === 1) {
          setList(Data);
        } else {
          setList([...list, ...Data]);
        }
      } else {
        setList(Data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //UseEffect to fetch data
  useEffect(() => {
    fetchData();
  }, [pageNumber, query]);

  return { list, pageNumber, setPageNumber, setQuery, loading, error, hasMore ,query};
}

export default useFetchImage;
