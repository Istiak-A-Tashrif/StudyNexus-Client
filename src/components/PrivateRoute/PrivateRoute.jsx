import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return (
      <span className="loading loading-spinner loading-lg block mx-auto min-h-svh"></span>
    );
  }

  if (user) {
    return <div>{children}</div>;
  }
  return <Navigate to={"/login"} state={location?.pathname || "/"}></Navigate>;
};

export default PrivateRoute;
