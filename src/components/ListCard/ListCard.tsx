import type { ShoppingList } from "../../store/api/apiSlice";
import styles from './ListCard.module.css'

interface ListCardProps {
    list: ShoppingList;
    onOpen: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function ListCard({ list, onOpen, onEdit, onDelete }: ListCardProps) {
    return (
        <div className={styles['list-card']}>
            <h3>{list.name}</h3>
            <p>{list.items.length} item{list.items.length === 1 ? '' : 's'}</p>

            <div className={styles['actions']}>
                <button onClick={onOpen}>View Items</button>
                <button onClick={onEdit}>Rename</button>
                <button onClick={onDelete}>Delete List</button>
            </div>
        </div>
    )
}