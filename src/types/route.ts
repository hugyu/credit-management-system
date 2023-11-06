import { RouteProps } from "react-router-dom";

export type PrivateRouteProps = RouteProps & {
    element: React.ReactNode;
  };