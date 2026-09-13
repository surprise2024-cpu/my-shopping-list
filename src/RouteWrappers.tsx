import { Navigate, Outlet } from "react-router";

interface RouteWrapperProps {
    isAuthenticated: boolean;
    isGuest?: boolean
}

export const PublicOnlyRoute = ({
    isAuthenticated
}: RouteWrapperProps) => {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />
}

export const ProtectedRoute = ({ 
    isAuthenticated 
}: RouteWrapperProps) => {

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace/>;
}

export const GuestRoute = ({ 
    isAuthenticated, 
    isGuest
}: RouteWrapperProps) => {

    return  (isAuthenticated || isGuest) ? <Outlet /> : <Navigate to='/login' replace/>;
}


