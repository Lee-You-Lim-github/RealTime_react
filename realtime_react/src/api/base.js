import Axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { API_HOST } from "Constants";
import { useState } from "react";

const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

const useAxios = makeUseAxios({
  axios: axiosInstance,
});

function useApiAxios(config, option) {
  const [{ data, loading, error, response }, execute, manualCancel] = useAxios(
    config,
    option
  );

  const [errorMessages, setErrorMessages] = useState({});

  return [
    { data, loading, error, response, errorMessages },
    execute,
    manualCancel,
  ];
}

export { axiosInstance, useApiAxios };
