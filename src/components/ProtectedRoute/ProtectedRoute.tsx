/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

export function ProtectedRoute(props: IProps) {
  const { children } = props;
  const location = useLocation();
  const { name } = useSelector((store: any) => store.auth.user);

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
