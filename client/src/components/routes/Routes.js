import { Suspense, useContext, lazy } from "react";
import { routes } from "./list";
import { Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Spinner from "../Spinner";
import { AuthContext } from "../../context/auth";

const Auth = lazy(() => import("../../pages/auth/Auth"));

const Routes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Suspense fallback={<Spinner loading={true} />}>
      <Switch>
        {!user && <Route path="*" component={Auth} exact />}
        {routes.map((route) => (
          <ProtectedRoutes
            key={route.key}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
