import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import useContexts from "../hooks/useContexts.js";

function PrivateRoute(props) {
  const { children, ...rest } = props;

  const { loading, email } = useContexts();

  if (loading) {
    return (
      <div className="text-center my-5 private-spinner py-5">
        <Spinner variant="danger" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h6>Loading...</h6>
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
