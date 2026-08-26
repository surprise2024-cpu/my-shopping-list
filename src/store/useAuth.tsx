import { useAppDispatch, useAppSelector } from "./hooks";
import { logout as logoutAction } from './authSlice'

export function useAuth() {
    const { user, token, isAuthenticated } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const logout = () => dispatch(logoutAction())

    return { user, token, isAuthenticated, logout }
}