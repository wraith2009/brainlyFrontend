import { useRecoilState } from "recoil";
import { IsLogin } from "../recoil/atoms/IsLogin";
import apiCall from "../api/auth.api";

export const useCheckTokenValidity = () => {
  const [, setValid] = useRecoilState(IsLogin);

  const checkTokenValidity = async () => {
    try {
      const response = await apiCall("/verify-token", {}, "GET");
      console.log(response);
      if (response.message === "Token is valid") {
        setValid(true);
        return true;
      } else {
        setValid(false);
        return false;
      }
    } catch (error) {
      setValid(false);
      return false;
    }
  };

  return { checkTokenValidity };
};
