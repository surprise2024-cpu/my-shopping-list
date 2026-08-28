
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
        <div className={styles['modal-overlay']} onClick={onCancel}>
            <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <p>{message}</p>

                <div className={styles['modal-actions']}>
                    <button className={styles['confirm-btn']} onClick={onConfirm}>Yes, Delete</button>
                    <button className={styles['cancel-btn']} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}