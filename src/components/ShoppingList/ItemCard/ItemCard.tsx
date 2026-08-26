import type { ShoppingListItem } from "../../../store/api/apiSlice";

import styles from './ItemCard.module.css'

interface ItemCardProps {
    item: ShoppingListItem
    onEdit: () => void
    onDelete: () => void
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
    return (
        <div className={styles['item-card']}>

            <h4>{item.name}</h4>
            <p>Category: {item.category}</p>

            {item.image && <img src={item.image} alt={item.name} width={80} height={80} />}

            <p>Qty: {item.quantity}</p>
            <p>Category: {item.category}</p>
            {item.notes && <p>Notes: {item.notes}</p>}

            <div>
                <button 
                    onClick={onEdit}
                >
                    Edit
                </button>
                <button 
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}