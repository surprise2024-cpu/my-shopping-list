import type { ShoppingListItem } from "../../../store/api/apiSlice";

import styles from './ItemCard.module.css'

interface ItemCardProps {
    item: ShoppingListItem
    onEdit?: () => void
    onDelete?: () => void
    readOnly?: boolean
}

export function ItemCard({ item, onEdit, onDelete, readOnly }: ItemCardProps) {
    return (
        <div className={styles['item-card']}>

            <h4>{item.name}</h4>

            {item.image && <img className={styles['item-image']} src={item.image} alt={item.name} width={80} height={80} />}

            <div className={styles['item-details']}>
                <p>Qty: {item.quantity}</p>
                <p>Category: {item.category}</p>
                {item.notes && <p>Notes: {item.notes}</p>}
            </div>

            

            {
                !readOnly && (
                    <div className={styles['actions']}>
                        <button 
                            className={styles['edit-btn']}
                            onClick={onEdit}
                        >
                            Edit
                        </button>
                        <button 
                            className={styles['delete-btn']}
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    </div>
                )
            }
        </div>
    )
}