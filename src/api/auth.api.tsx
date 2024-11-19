import axios from "axios";
import { API_URL } from "../config/api";

const apiCall = async (
  url: string,
  data: Record<string, any> = {},
  method: string = "POST"
) => {
  console.log("API call:", method, url, data);
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${url}`,
      data,
    });

    return response.data;
  } catch (error) {
    console.error("API call failed:", error);

    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "An error occurred" };
    } else {
      throw { message: "An error occurred" };
    }
  }
};

export default apiCall;
