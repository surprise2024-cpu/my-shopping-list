import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthUser {
    id: number
    email: string
    name: string
    surname: string
    cellNumber: string
}

export interface AuthState {
    user: AuthUser | null
    token: string | null
    isAuthenticated: boolean
}

const storedToken = localStorage.getItem('token')
const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
    token: storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: Boolean(storedToken)
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: AuthUser; token: string }>
        ) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        updateUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
    },
})

export const { setCredentials, updateUser, logout } = authSlice.actions
export default authSlice.reducer