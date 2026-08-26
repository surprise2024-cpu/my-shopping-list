import React, { useState } from 'react'

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
import type { ListFormValues } from '../../schema/listSchema'
import { toast } from 'react-toastify'
import { ListCard } from '../ListCard/ListCard'

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

  const [showForm, setShowForm] = useState(false)
  const [editingList, setEditingList] = useState<ShoppingList | null>(null)
  const [deletetarget, setDeleteTarget] = useState<ShoppingList | null>(null)

  if (!user) return null

  const openAddForm = () => {
    setEditingList(null)
    setShowForm(true)
  }

  const handleSubmit= async (values: ListFormValues) => {
    try {
      if (editingList) {
        await updateList({ id: editingList.id, name: values.name }).unwrap()

        toast.success('List Renamed')
      } else {
        await addList({
          name: value.name,
          userId: user.id,
          createdAt: new Date().toISOString(),
          items: [],
        }).unwrap()

        toast.success('List created')
      }

      setShowForm(false)
      setEditingList(null)
    }
    catch {
      toast.error('Something went wrong. Please try again. ')
    }
  }

  const handleDelete = async () => {
    if (!deletetarget) return

    try {
      await deleteList(deletetarget.id).unwrap()
      toast.success('List deleted')
      setDeleteTarget(null)
    } 
    catch {
      toast.error('Could not delete list')
    }
    finally {
      setDeleteTarget(null)
    } 
  }

  if (isLoading) {

    return (
      <div className={styles['body-cont']}>
        <p>Loading....</p>
      </div>
    )
  }

  const hasLists = lists && lists.length > 0

  return (
    <div className={styles['body-cont']}>
      
      {
        !hasLists ? (
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
          </div>
        ) : (
          <div className={styles['list-grid']}>
            {
              lists.map((list) => (
                <ListCard 
                  key={list.id} 
                  list={list} 
                  onOpen={() => navigate(`/lists/${list.id}`)}
                  onEdit={() => {{setEditingList(list)} setShowForm(true)}} 
                  onDelete={() => setDeleteTarget(list)}
                />
                  
              ))
            }
          </div>
              
        )
      }
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
