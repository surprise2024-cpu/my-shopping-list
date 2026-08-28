import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  type { AuthUser } from "../authSlice";
import { API_BASE_URL } from "../../../config";

export interface ShoppingListItem {
    id: string
    name: string
    quantity: number
    notes?: string
    category: string
    image?: string
    createdAt?: string // for sorting with the date
}

export interface ShoppingList {
    id: number 
    name: string
    userId: number
    createdAt: string
    items: ShoppingListItem[]
}

export interface Category {
    id: number
    name: string
    userId: number
}

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['List', 'Category'],
    endpoints: (builder) => ({
        // Shopping Lists
        getLists: builder.query<ShoppingList[], { userId: number; search?: string; sort?: string }>({
            query: ({ userId, search, sort }) => {
                const params = new URLSearchParams()
                params.set('userId', String(userId))
                if (search) params.set('name_like', search)
                if (sort) {
                    const [field, order] = sort.split(':')
                    params.set('_sort', field)
                    params.set('_order', order === 'desc' ? 'desc' : 'asc')
                }
                return `/lists?${params.toString()}`
            },
            providesTags: (result) => 
                result ? [
                    ...result.map(({ id }) => ({ type: 'List' as const, id })),
                    { type: 'List' as const, id: 'LIST' },
                ] 
                : [{ type: 'List' as const, id: 'LIST' }],
        }),

        getList: builder.query<ShoppingList, number>({
            query: (id) => `/lists/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'List', id }],
        }),

        addList: builder.mutation<ShoppingList, Partial<ShoppingList>>({
            query: (body) => ({
                url: '/lists',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'List', id: 'LIST' }]
        }),

        updateList: builder.mutation<ShoppingList, Partial<ShoppingList> & Pick<ShoppingList, 'id'>>({
            query: ({ id, ...patch }) => ({
                url: `/lists/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'List', id }],
        }),

        deleteList: builder.mutation<void, number>({
            query: (id) => ({
                url: `/lists/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'List', id }, { type: 'List', id: 'LIST' }],
        }),

        // Categories for users are seperate
        getCategories: builder.query<Category[], number>({
            query: (userId) => `/categories?userId=${userId}`,
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Category' as const, id })),
                    { type: 'Category' as const, id: 'LIST' },
                ] 
                : [{ type: 'Category' as const, id: 'LIST' }],
        }),

        addCategory: builder.mutation<Category, { name: string; userId: number }>({
            query: (body) => ({
                url: '/categories',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),

        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),

        updateUser: builder.mutation<AuthUser, Partial<AuthUser> & Pick<AuthUser, 'id'>>({
            query: ({ id, ...patch }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: patch
            }),
        }),

    }),
})

export const {
    useGetListsQuery,
    useGetListQuery,
    useAddListMutation, 
    useUpdateListMutation,
    useDeleteListMutation,
    useGetCategoriesQuery,
    useAddCategoryMutation, 
    useDeleteCategoryMutation, 
    useUpdateUserMutation,
} = apiSlice