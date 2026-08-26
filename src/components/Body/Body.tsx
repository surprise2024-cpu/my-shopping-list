import React, { useState } from 'react'

import styles from './Body.module.css'
import emptyState from '../../assets/shopping.png'
import addIcon from '../../assets/add-button.png'

import {
  useGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} from '../../store/api/apiSlice'

import type { ShoppingList } from '../../store/api/apiSlice'
import { useNavigate } from 'react-router'
import { useAuth } from '../../store/useAuth'
import type { ListFormValues } from '../../schema/listSchema'
import { toast } from 'react-toastify'
import { ListCard } from '../ShoppingList/ListCard/ListCard'
import { ListForm } from '../ShoppingList/ListForm/ListForm'
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'

export const Body: React.FC = () => {

  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: lists, isLoading } = useGetListsQuery(
    { userId: user?.id ?? 0 },
    { skip: !user }
  )

  const [ addList ] = useAddListMutation()
  const [ updateList ] = useUpdateListMutation()
  const [ deleteList ] = useDeleteListMutation()

  const [showForm, setShowForm] = useState(false)
  const [editingList, setEditingList] = useState<ShoppingList | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ShoppingList | null>(null)

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
          name: values.name,
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
    if (!deleteTarget) return

    try {
      await deleteList(deleteTarget.id).unwrap()
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
                  onEdit={() => {
                    setEditingList(list) 
                    setShowForm(true)
                  }} 
                  onDelete={() => setDeleteTarget(list)}
                />
                  
              ))
            }
          </div>
              
        )
      }
      <div className={styles['body-btn']}>

        <button 
          className={styles['add-btn']}
          onClick={openAddForm}
        >

          <div className={styles['add-btn-holder']}>

            <div className={styles['add-btn-icon']}>

              <img src={addIcon} alt='empty state' />

            </div>
            <div className={styles['add-btn-text']}>

              <span>Add List</span>

            </div>
          
          </div>
        </button>

      </div>

      {
        showForm && (
          <ListForm 
            defaultValues={editingList ? { name: editingList?.name }: undefined}
            submitLabel={editingList ? 'Save Changes' : 'Create List'}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditingList(null)
            }}
          />
        )
      }

      <ConfirmModal 
        isOpen={deleteTarget !== null}
        title='Delete List'
        message={`Are you sure that you want to delete the list "${deleteTarget?.name}"`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
    
  )
}
