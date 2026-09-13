import { useEffect, useRef, useState } from "react";
import type { ShoppingList } from "../../../store/api/apiSlice";
import styles from './ListCard.module.css'

interface ListCardProps {
    list: ShoppingList;
    onOpen: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function ListCard({ list, onOpen, onEdit, onDelete }: ListCardProps) {

    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={styles['list-card']}>
            <h3>{list.name}</h3>
            
            <p>{list.items.length} item{list.items.length === 1 ? '' : 's'}</p>

            <div className={styles['actions']}>
                <button className={styles['view-btn']} onClick={onOpen}>View Items</button>
                <button className={styles['rename-btn']} onClick={onEdit}>Rename List</button>
                <button className={styles['delete-btn']} onClick={onDelete}>Delete List</button>
            </div>
        </div>
    )
}