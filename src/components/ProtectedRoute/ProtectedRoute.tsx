/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: JSX.Element;
}

export function ProtectedRoute(props: IProps) {
  const { children } = props;
  const location = useLocation();
  const { isLoggedIn } = useSelector((store: any) => store.auth);

  if (!isLoggedIn) {
    // console.log('location in ProtectedRoute', location)
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children;
}
