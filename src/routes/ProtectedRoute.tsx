import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  return user !== null && children;
};

export default ProtectedRoute;
