/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "../../redux/store";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: JSX.Element;
}

export function ProtectedRoute(props: IProps) {
  const { children } = props;
  const location = useLocation();
  const { isLoggedIn } = useSelector((store) => store.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children;
}
