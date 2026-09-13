import { Navigate, Outlet } from "react-router";

interface RouteWrapperProps {
    isAuthenticated: boolean;
    isGuest?: boolean
}

export const ProtectedRoute = ({ isAuthenticated, isGuest }: RouteWrapperProps) => {

    return (isAuthenticated || isGuest) ? <Outlet /> : <Navigate to='/login' replace/>;
}

export const PublicOnlyRoute = ({ isAuthenticated, isGuest }: RouteWrapperProps) => {

    return (!isAuthenticated && !isGuest) ? <Outlet /> : <Navigate to='/' replace/>;
}

