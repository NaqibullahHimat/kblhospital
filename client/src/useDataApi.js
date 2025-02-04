import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    if(!url) return; 
    
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  
  return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;