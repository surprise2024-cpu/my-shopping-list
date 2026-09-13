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
import { useNavigate, useSearchParams } from 'react-router'
import { useAuth } from '../../store/useAuth'

import type { ListFormValues } from '../../schema/listSchema'
import { toast } from 'react-toastify'
import { ListCard } from '../ShoppingList/ListCard/ListCard'
import { ListForm } from '../ShoppingList/ListForm/ListForm'
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'
import { SearchSortBar } from '../ShoppingList/Search/SearchSortBar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addGuestList, deleteGuestList, updateGuestList } from '../../store/guestSlice'

export const Body: React.FC = () => {

  const { user, isGuest } = useAuth()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const sort = searchParams.get('sort') ?? ''

  const { data: fetchedLists, isLoading } = useGetListsQuery(
    { userId: user?.id ?? 0, search: search || undefined, sort: sort || undefined },
    { skip: !user || isGuest }
  )

  const guestLists = useAppSelector((state) => state.guest.lists);

  const lists = React.useMemo(() => {
    if (!isGuest) return fetchedLists

    let result = guestLists

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((l) => l.name.toLowerCase().includes(q))
    }

    if (sort) {
      const [field, order] = sort.split(':') as [keyof ShoppingList, 'asc' | 'desc']
      result = [...result].sort((a, b) => {
        const cmp = String(a[field] ?? '').localeCompare(String(b[field] ?? ''))
        return order === 'desc' ? -cmp : cmp
      })
    }

    return result;

  }, [isGuest, fetchedLists, guestLists, search, sort])

  const [ addList ] = useAddListMutation()
  const [ updateList ] = useUpdateListMutation()
  const [ deleteList ] = useDeleteListMutation()

  const [showForm, setShowForm] = useState(false)
  const [editingList, setEditingList] = useState<ShoppingList | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ShoppingList | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  if (!user && !isGuest) return null

  const openAddForm = () => {
    setEditingList(null)
    setShowForm(true)
  }

  const handleSearchChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('search', value)
        else next.delete('search')
        return next
      },
      {replace: true}
    )
  }

  const handleSortChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('sort', value)
        else next.delete('sort')
        return next
      },
      {replace: true}
    )
  }

  const handleSubmit= async (values: ListFormValues) => {

    if (isGuest) {
      try {
        if (editingList) {
          dispatch(updateGuestList({ id: editingList.id, name: values.name }))
          toast.success('List renamed successfully')
        } else {
          dispatch(addGuestList({ name: values.name }))
          toast.success('List created successfully')
        }

        setShowForm(false)
        setEditingList(null)

      } catch {
        toast.error('Something went wrong. Please try again.')
      }

      return;
    }

    try {
      if (editingList) {
        await updateList({ id: editingList.id, name: values.name }).unwrap()

        toast.success('List Renamed')
        
      } else {
        await addList({
          name: values.name,
          userId: user?.id,
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

    if (isGuest) {
      dispatch(deleteGuestList(deleteTarget.id))
      toast.success('List deleted successfully')
      setDeleteTarget(null)
      return
    }

    setIsDeleting(true)
    try {
      await deleteList(deleteTarget.id).unwrap()
      toast.success('List deleted successfully')
      setDeleteTarget(null)
    } 
    catch {
      toast.error('List could not be deleted. Try Again.')
    }
    finally {
      setDeleteTarget(null)
      setIsDeleting(false)
    } 
  }

  if (isLoading && !isGuest) {

    return (
      <div className={styles['body-cont-loading']}>
        <p>Loading....</p>
      </div>
    )
  }

  const hasLists = lists && lists.length > 0

  return (
    <div className={styles['body-cont']}>

      <div className={styles['sort-search-add-cont']}>

        <div className={styles['sort-search-wrapper']}>

          <SearchSortBar 
            search={search}
            sort={sort}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            searchPlaceholder='Search lists by name...'
            sortOptions={[
              { value: 'name:asc', label: 'Name (A-Z)' },
              { value: 'name:desc', label: 'Name (Z-A)' },
              { value: 'createdAt:desc', label: 'Date Added (Newest)' },
              { value: 'createAt:asc', label: 'Date Added (Oldest)' },
            ]}  
          />
          
        </div>
        <div className={styles['body-btn']}>

          <button 
            className={styles['add-btn']}
            onClick={openAddForm}
          >

            <div className={styles['add-btn-holder']}>

              <div className={styles['add-btn-icon']}>

                <img src={addIcon} alt='add state' />

              </div>
              <div className={styles['add-btn-text']}>

                <span>Create List</span>

              </div>
            
            </div>
          </button>

        </div>
      </div>
      
      {
        !hasLists ? (
          <div className={styles['holder']}>

            <div className={styles['body-text']}>

              <span>No lists created yet</span>

            </div>
            <div className={styles['body-image']}>

              <img src={emptyState} alt='empty state' />

            </div>
            <div className={styles['body-text']}>

              <span>Create your first list today</span>

            </div>
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

                <span>Create List</span>

              </div>
            
            </div>
          </button>

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
        isLoading={isDeleting}
      />
    </div>
    
  )
}
