import { useAppDispatch, useAppSelector } from "./hooks";
import { logout as logoutAction, continueAsGuest as continueAsGuestAction } from './authSlice'

export function useAuth() {
    const { user, token, isAuthenticated, isGuest } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const logout = () => dispatch(logoutAction())
    const continueAsGuest = () => dispatch(continueAsGuestAction())

    return { user, token, isAuthenticated, logout, isGuest, continueAsGuest }
}