import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function ProtectedRoute({ component: Component, ...rest }) {
  const isLoggedIn = useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
