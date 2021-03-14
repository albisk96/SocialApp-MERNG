import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const ProtectedRoutes = ({ key, exact, path, component }) => {
  const { user } = useContext(AuthContext);
  return user ? (
    <Route component={component} exact={exact} path={path} key={key} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoutes;
