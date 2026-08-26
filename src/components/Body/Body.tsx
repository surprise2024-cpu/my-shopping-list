import React from 'react'

import styles from './Body.module.css'
import emptyState from '../../assets/shopping.png'
import addIcon from '../../assets/add-button.png'

//import { useAuth } from ''

import {
  useGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useGetListQuery,
} from '../../store/api/apiSlice'

import type { ShoppingList } from '../../store/api/apiSlice'
import { useNavigate } from 'react-router'
import { useAuth } from '../../store/useAuth'

export const Body: React.FC = () => {

  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: lists, isLoading } = useGetListQuery(
    { userId: user?.id ?? 0 },
    { skip: !user }
  )

  const [ addList ] = useAddListMutation()
  const [ updateList ] = useUpdateListMutation()
  const [ deleteList ] = useDeleteListMutation()

  if (!user) return null

  const openAddForm = () => {
    setEditingList(null)
    setShowForm(true)
  }



  return (
    <div className={styles['body-cont']}>

      <div className={styles['holder']}>

        <div className={styles['body-text']}>

          <span>List is Empty</span>

        </div>
        <div className={styles['body-image']}>

          <img src={emptyState} alt='empty state' />

        </div>
        <div className={styles['body-text']}>

          <span>Add your First item today</span>

        </div>
        <div className={styles['body-btn']}>

          <button className={styles['add-btn']}>

            <div className={styles['add-btn-holder']}>

              <div className={styles['add-btn-icon']}>

                <img src={addIcon} alt='empty state' />

              </div>
              <div className={styles['add-btn-text']}>

                <span>Add Item</span>

              </div>
            
            </div>
          </button>

        </div>
      </div>
    </div>
  )
}
