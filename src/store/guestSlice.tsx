import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, ShoppingList, ShoppingListItem } from "./api/apiSlice";
import { listSchema } from "../schema/listSchema";


interface GuestState {
    lists: ShoppingList[]
    categories: Category[]
}

const GUEST_LISTS_KEY = 'guest_lists'
const GUEST_CATEGORIES_KEY = 'guess_categories'

const loadGuestLists = (): ShoppingList[] => {
    try {
        const raw = localStorage.getItem(GUEST_LISTS_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

const loadGuestCategories = (): Category[] => {
    try {
        const raw = localStorage.getItem(GUEST_CATEGORIES_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

const persistLists = (lists: ShoppingList[]) => {
    localStorage.setItem(GUEST_LISTS_KEY, JSON.stringify(lists))
}

const persistCategories = (categories: Category[]) => {
    localStorage.setItem(GUEST_CATEGORIES_KEY, JSON.stringify(categories))
}

const initialState: GuestState = {
    lists: loadGuestLists(),
    categories: loadGuestCategories(),
}

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        addGuestList: (state, action: PayloadAction<{ name: string }>) => {
            const newList: ShoppingList = {
                id: Date.now(),
                name: action.payload.name,
                userId: 0, // mock value, guests have no user id
                createdAt: new Date().toString(),
                items: [],

            }

            state.lists.push(newList)
            persistLists(state.lists)
        },

        updateGuestList: (state, action: PayloadAction<{ id: number; name?: string; items?: ShoppingListItem[] }>) => {
            
            const list = state.lists.find((l) => l.id === action.payload.id)
            if (!list) return
            if (action.payload.name !== undefined) list.name = action.payload.name
            if (action.payload.items !== undefined) listSchema.items = action.payload.items
            persistLists(state.lists)
        },

        deleteGuestList: (state, action: PayloadAction<number>) => {
            state.lists = state.lists.filter((l) => l.id !== action.payload)
            persistLists(state.lists)
        },

        addGuestCategory: (state, action: PayloadAction<{ name: string }>) => {
            const newCategory: Category = {
                id: Date.now(),
                name: action.payload.name,
                userId: 0,
            }

            state.categories.push(newCategory)
            persistCategories(state.categories)
        },

        clearGuestData: (state) => {
            state.lists = []
            state.categories = []
            localStorage.removeItem(GUEST_LISTS_KEY)
            localStorage.removeItem(GUEST_CATEGORIES_KEY)
        },
    },
})

export const { 
    addGuestList, 
    updateGuestList,
    deleteGuestList,
    addGuestCategory,
    clearGuestData 
} = guestSlice.actions;

export default guestSlice.reducer;