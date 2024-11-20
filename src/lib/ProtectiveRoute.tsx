import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { IsLogin } from "../recoil/atoms/IsLogin";
import { useNavigate } from "react-router-dom";
import { useCheckTokenValidity } from "./authorization";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectiveRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogin = useRecoilValue(IsLogin);
  const { checkTokenValidity } = useCheckTokenValidity();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const valid = await checkTokenValidity();
      if (!valid) {
        navigate("/");
      }
      setLoading(false);
    };

    if (!isLogin) {
      verify();
    } else {
      setLoading(false);
    }
  }, [isLogin, checkTokenValidity, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLogin ? children : null;
};

export default ProtectiveRoute;
