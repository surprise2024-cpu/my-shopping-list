

import styles from './ConfirmModal.module.css'

interface ConfirmModalProps {
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal']}>
                <h3>{title}</h3>
                <p>{message}</p>

                <div className={styles['modal-actions']}>
                    <button onClick={onConfirm}>Yes, Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}