import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Theme = 'light' | 'dark'

interface UiState {
    theme: Theme
    notificationsEnabled: boolean
}

const storedTheme = localStorage.getItem('theme')
const storedNotifications = localStorage.getItem('notificationsEnabled')

const initialState: UiState = {
    theme: storedTheme == 'dark' ? 'dark' : 'light',
    notificationsEnabled: storedNotifications !== 'false',
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', state.theme)
        },
        toggleNotifications: (state) => {
            state.notificationsEnabled = !state.notificationsEnabled
            localStorage.setItem('notificationsEnabled', String(state.notificationsEnabled))
        },
    },
})

export const { toggleTheme, toggleNotifications } = uiSlice.actions
export default uiSlice.reducer