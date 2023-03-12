import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
  }, [user, navigate]);

  return <div>{children}</div>;
};
export default AuthGuard;
