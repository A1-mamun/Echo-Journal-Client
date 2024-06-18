import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  // interceptors

  // request interceptors
  axiosSecure.interceptors.request.use(
    function (config) {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        "access-token"
      )}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // response interceptors
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
