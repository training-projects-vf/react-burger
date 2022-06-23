/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";


export function ProtectedRoute({ children }) {
  const location = useLocation();
  const { name } = useSelector(store => store.auth.user);

  if (!name) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
      />
    )
  }

  return children;
}
