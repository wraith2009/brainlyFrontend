import axios from "axios";
import { API_URL } from "../config/api";

const token = localStorage.getItem("token");

const apiCall = async (
  url: string,
  data: Record<string, any> = {},
  method: string = "POST"
) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${url}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
  }
};

export default apiCall;
