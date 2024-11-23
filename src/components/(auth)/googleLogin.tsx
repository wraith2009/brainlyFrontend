import { useGoogleLogin } from "@react-oauth/google";
import apiCall from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { UserIdState } from "../../recoil/atoms/auth.atom";
import { useSetRecoilState } from "recoil";
import { FaGoogle } from "react-icons/fa";
function GoogleLoginComponent() {
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(UserIdState);
  const googleResponse = async (authResult: any) => {
    try {
      if (authResult["code"]) {
        const url = `/auth/google?code=${authResult.code}`;
        const response = await apiCall(url, {}, "GET");
        // console.log("response", response);
        const token = response.token;

        if (token) {
          localStorage.setItem("token", token);
          setUserId(response.user._id);
          navigate("/Home");
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code",
  });

  return (
    <div>
      <button
        onClick={() => login()}
        className="w-full flex  my-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaGoogle className="mr-2 mt-1" />
        Google Login
      </button>
    </div>
  );
}

export default GoogleLoginComponent;
