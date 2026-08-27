import { Navigate, Outlet } from "react-router";

interface RouteWrapperProps {
    isAuthenticated: boolean;
}

export const ProtectedRoute = ({ isAuthenticated }: RouteWrapperProps) => {

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace/>;
}

export const PublicOnlyRoute = ({ isAuthenticated }: RouteWrapperProps) => {

    return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace/>;
}

