import { Navigate, Outlet } from "react-router";
import  type { AuthState } from './store/authSlice';
import { useAppSelector } from "./store/hooks";

interface RouteWrapperProps {
    isAuthenticated: boolean;
}

export const ProtectedRoute = ({ isAuthenticated }: RouteWrapperProps) => {

    return isAuthenticated ? <Outlet /> : <Navigate to='/signin-page' replace/>;
}

export const PublicOnlyRoute = ({ isAuthenticated }: RouteWrapperProps) => {

    return isAuthenticated ? <Outlet /> : <Navigate to='/' replace/>;
}

