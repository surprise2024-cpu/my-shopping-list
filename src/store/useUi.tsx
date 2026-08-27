import { useAppDispatch, useAppSelector } from "./hooks";
import { toggleTheme as toggleThemeAction, toggleNotifications as toggleNotificationsAction } from "./uiSlice";


export function useUi() {
    const { theme, notificationsEnabled } = useAppSelector((state) => state.ui)

    const dispatch = useAppDispatch()

    const toggleTheme = () => dispatch(toggleThemeAction())

    const toggleNotifications = () => dispatch(toggleNotificationsAction())

    return { theme, notificationsEnabled, toggleTheme, toggleNotifications }
}