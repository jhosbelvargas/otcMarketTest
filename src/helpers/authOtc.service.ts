import axios from "axios";

export const getToken = async () => {
  const URL = `http://localhost:4000/auth/login`;

  try {
    const response = await axios.post(URL, {
      clientid: "13",
      secret: "rsEYgcVzdSHpny4hnp1hxNGhVHRXKfMaiKAfE6lNV9E=",
    });
    const finalResponse = response.data.token;
    return finalResponse;
  } catch (error) {
    console.error("Error post tasks by user:", error);
    throw error;
  }
};
