import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to="/" />)}
    />
  );
}
