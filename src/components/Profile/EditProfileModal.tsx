import { PasswordForm } from './PasswordForm'
import styles from './Profile.module.css'
import { ProfileForm } from './ProfileInfo'

interface EditProfileModalProps {
    onClose: () => void
}

export function EditProfileModal({ onClose }: EditProfileModalProps) {
    return (
        <div className={styles['edit-overlay']} onClick={onClose}>
            <div className={styles['edit-modal']} onClick={(e) => e.stopPropagation()}>
                <button className={styles['close-btn']} onClick={onClose}>
                    x
                </button>
                <ProfileForm />
                <div className={styles['modal-divider']} />
                <PasswordForm />

            </div>

        </div>
    )
}