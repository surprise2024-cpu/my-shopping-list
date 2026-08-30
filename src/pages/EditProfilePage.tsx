import { PasswordForm } from "../components/Profile/PasswordForm";
import { ProfileForm } from "../components/Profile/ProfileInfo";
import styles from '../components/Profile/Profile.module.css'

export function EditProfilePage() {
    return (
        <div className={styles['edit-profile-cont']}>
            <ProfileForm />
            <PasswordForm />
        </div>
    )
}