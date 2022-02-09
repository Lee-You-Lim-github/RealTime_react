import { useEffect, useState } from "react";

function useLocalStorage(key, initialValues) {
  const [data, setDate] = useState(() => {
    const jsonString = window.localStorage.getItem(key);
    try {
      return jsonString ? JSON.parse(jsonString) : initialValues;
    } catch (e) {
      console.error(e);
      return initialValues;
    }
  });

  useEffect(() => {
    const jsonString = JSON.stringify(data);
    window.localStorage.setItem(key, jsonString);
  }, [key, data]);

  return [data, setDate];
}

export default useLocalStorage;
