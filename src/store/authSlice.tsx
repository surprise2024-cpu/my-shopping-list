import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthUser {
    id: number
    email: string
    name: string
    surname: string
    cellNumber: string
    avatar?: string
}

export interface AuthState {
    user: AuthUser | null
    token: string | null
    isAuthenticated: boolean
    isGuest: boolean
}

const storedToken = localStorage.getItem('token')
const storedUser = localStorage.getItem('user')
const storedGuest = localStorage.getItem('isGuest') === 'true'

// checks whether a user has a token and is stored in the database
const hasAuthenticationSession = Boolean(
    storedToken && storedUser
)

const initialState: AuthState = {
    token: hasAuthenticationSession ? storedToken : null,
    user: hasAuthenticationSession && storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: hasAuthenticationSession,
    isGuest: !hasAuthenticationSession && storedGuest,
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

            // makes sure that a guest and a user cannot be the same
            state.isGuest = false

            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))

            localStorage.removeItem('isGuest')
        },

        continueAsGuest: (state) => {

            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            state.isGuest = true;

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            localStorage.setItem('isGuest', 'true');

        },

        exitGuest: (state) => {

            state.user = null;
            state.token = null;

            state.isAuthenticated = false;
            state.isGuest = false

            localStorage.removeItem('isGuest')
        },

        updateUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            state.isGuest = false

            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('isGuest')
        },
    },
})

export const { 
    setCredentials, 
    updateUser, 
    continueAsGuest,
    exitGuest, 
    logout } = authSlice.actions

export default authSlice.reducer