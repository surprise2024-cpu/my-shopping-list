import { useParams, useSearchParams } from "react-router";
import { useAuth } from "../store/useAuth";
import { useGetListQuery, useUpdateListMutation, type ShoppingListItem } from "../store/api/apiSlice";
import { useMemo, useState } from "react";
import type { ItemFormValues } from "../schema/itemSchema";
import { toast } from "react-toastify";
import { ItemForm } from "../components/ShoppingList/ItemForm/ItemForm";
import { ConfirmModal } from "../components/ConfirmModal/ConfirmModal";
import { ItemCard } from "../components/ShoppingList/ItemCard/ItemCard";
import { SearchSortBar } from "../components/ShoppingList/Search/SearchSortBar";
import styles from './ListDetailPage.module.css'

export function ListDetailsPage() {
    const { id } = useParams()
    const listId = Number(id)
    const { user } = useAuth()

    const { data: list, isLoading, error } = useGetListQuery(listId, {skip: !listId })
    const [updateList] = useUpdateListMutation()

    const [showForm, setShowForm] = useState(false)
    const [editItem, setEditItem] = useState<ShoppingListItem | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<ShoppingListItem | null>(null)

    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search') ?? ''
    const sort = searchParams.get('sort') ?? ''

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

    const filteredItems = useMemo(() => {
        if (!list) return []

        let result = list.items

        if (search) {
            const q = search.toLowerCase()
            result = result.filter((item) => item.name.toLowerCase().includes(q))
        }

        if (sort) {
            const [field, order] = sort.split(':') as [keyof ShoppingListItem, 'asc' | 'desc']

            result = [...result].sort((a, b) => {
                const cmp = String(a[field] ?? '').localeCompare(String(b[field] ?? ''))
                return order === 'desc' ? -cmp : cmp
            })
        }

        return result
    }, [list, search, sort])

    if (!user) return null

    if(isLoading) return <p>Loading....</p>

    if (error || !list) return <p>List not found.</p>


    const isOwner = list.userId === user.id

    const handleShare = async () => {
        const url = `${window.location.origin}/lists/${list.id}`

        try {
            await navigator.clipboard.writeText(url)
            toast.success('Link copied to clipboard')
        }
        catch {
            toast.error('Could not copy link')
        }
    }

    const handleSubmit = async (values: ItemFormValues) => {
        try {
            let newItems: ShoppingListItem[]

            if (editItem) {
                newItems = list.items.map((item) => 
                    item.id === editItem.id ? {...item, ...values} : item)
            }
            else {
                const newItem: ShoppingListItem = {
                    id: crypto.randomUUID(),
                    ...values,
                    createdAt: new Date().toISOString(),
                }

                newItems = [...list.items, newItem]
            }

            await updateList({ id: list.id, items: newItems }).unwrap()
            toast.success(editItem ? 'Item updated' : 'Item added')

            setShowForm(false)
            setEditItem(null)
        }
        catch {
            toast.error('Something went wrong. PLease try again.')
        }
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        try {
            const newItems = list.items.filter((item) => item.id !== deleteTarget.id)
            await updateList({ id: list.id, items: newItems }).unwrap()
            toast.success('Item Deleted')
        }
        catch {
            toast.error('Item could not be deleted')
        }
        finally {
            setDeleteTarget(null)
        }
    }

    return (
        <div className={styles['page-cont']}>
            <h1 className={styles['list-title']}>{list.name}</h1>

            <div className={styles['action-row']}>
                <button className={styles['share-btn']} onClick={handleShare}>Share</button>

                {
                    isOwner ? (
                        <button 
                            className={styles['add-item-btn']}
                        onClick={() => { 
                            setEditItem(null)
                            setShowForm(true)
                            
                        }}>
                            + Add Item
                        </button>
                    ) : (
                        <p className={styles['readonly-text']}><em>You're viewing a shared list (read-only)</em></p>
                    )
                }
            </div>
            {
                showForm && (
                    <ItemForm 
                        userId={user.id}
                        defaultValues={editItem ?? undefined}
                        submitLabel={editItem ? 'Save Changes' : 'Add Item'}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setShowForm(false)
                            setEditItem(null)
                        }}
                    />
                ) 
                
            }

            {/*Search/Sort for items controlled by the URL */}
            <SearchSortBar 
                search={search}
                sort={sort}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                searchPlaceholder="Search items by name..."
                sortOptions={[
                    { value: 'name:asc', label: 'Name (A-Z)' },
                    { value: 'name:desc', label: 'Name (ZZ-A)' },
                    { value: 'category:asc', label: 'Category (A-Z)' },
                    { value: 'category:desc', label: 'Category (Z-A)' },
                    { value: 'createdAt:desc', label: 'Date Added (Newest)' },
                    { value: 'createdAt:asc', label: 'Date Added (Oldest)' },
                ]}
            />

            {list.items.length === 0 && <p className={styles['status-text']}>No items added yet</p>}
            
            {list.items.length > 0 && filteredItems.length === 0 && <p className={styles['status-text']}>No items match your search. Try again</p>}

            <div className={styles['item-grid']}>
                {
                    filteredItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onEdit={() => {
                                setEditItem(item)
                                setShowForm(true)
                            }}
                            onDelete={() => setDeleteTarget(item)}
                        />
                    ))
                }
            </div>

            <ConfirmModal 
                isOpen={deleteTarget !== null}
                title="Delete Item"
                message={`Are you sure that you want to delete ${deleteTarget?.name}`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null) }
            />

        </div>
    )
    
}