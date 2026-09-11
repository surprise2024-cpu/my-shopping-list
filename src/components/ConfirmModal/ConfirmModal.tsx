
import styles from './ConfirmModal.module.css'

interface ConfirmModalProps {
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
    isLoading?: boolean
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isLoading }: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className={styles['modal-overlay']} onClick={isLoading ? undefined : onCancel}>
            <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <p>{message}</p>

                <div className={styles['modal-actions']}>
                    <button className={styles['confirm-btn']} onClick={onConfirm} disabled={isLoading}>{isLoading ? 'Deleting...' : 'Yes, Delete'}</button>
                    <button className={styles['cancel-btn']} onClick={onCancel} disabled={isLoading}>Cancel</button>
                </div>
            </div>
        </div>
    )
}