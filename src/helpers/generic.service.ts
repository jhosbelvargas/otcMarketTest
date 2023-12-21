import axios from "axios";
import axiosApiInstance from "../interceptors/axios.interceptor";

export const getEmail = async (email: string | undefined) => {
  const URL = `http://localhost:4000/user/findUserByEmail/${email}`;
  try {
    const response = await axios.get(URL, {});
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching email info:", error);
    return null;
  }
};
