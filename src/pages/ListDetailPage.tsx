import { useParams } from "react-router";
import { useAuth } from "../store/useAuth";
import { useGetListQuery, useUpdateListMutation, type ShoppingListItem } from "../store/api/apiSlice";
import { useState } from "react";
import type { ItemFormValues } from "../schema/itemSchema";
import { toast } from "react-toastify";
import { ItemForm } from "../components/ShoppingList/ItemForm/ItemForm";
import { ListCard } from "../components/ShoppingList/ListCard/ListCard";
import { ConfirmModal } from "../components/ConfirmModal/ConfirmModal";
import { ItemCard } from "../components/ShoppingList/ItemCard/ItemCard";


export function ListDetailsPage() {
    const { id } = useParams()
    const listId = Number(id)
    const { user } = useAuth()

    const { data: list, isLoading, error } = useGetListQuery(listId, {skip: !listId })
    const [updateList] = useUpdateListMutation()
    const [showForm, setShowForm] = useState(false)
    const [editItem, setEditItem] = useState<ShoppingListItem | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<ShoppingListItem | null>(null)

    if (!user) return null

    if(isLoading) return <p>Loading....</p>

    if (error || !list) return <p>List not found.</p>

    const handleSubmit = async (values: ItemFormValues) => {
        try {
            let newItems: ShoppingListItem[]

            if (editItem) {
                newItems = list.items.map((item) => item.id === editItem.id ? {...item, ...values} : item)
            }
            else {
                const newItem: ShoppingListItem = {
                    id: crypto.randomUUID(),
                    ...values,
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
        <div>
            <h1>{list.name}</h1>

            <button onClick={() => { 
                setEditItem(null)
                setShowForm(true)
            }}>
                + Add Item
            </button>

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

            {list.items.length === 0 && <p>No items added yet</p>}

            <div>
                {
                    list.items.map((item) => (
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
                title="Delete item"
                message={`are you sure that you want to delete ${deleteTarget?.name}`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null) }
            />

        </div>
    )
    
}