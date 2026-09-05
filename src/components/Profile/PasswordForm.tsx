import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, type PasswordFormData } from "../../schema/profileSchema";
import { useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from './Profile.module.css'
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../store/useAuth";


export function PasswordForm() {

    const { user, token } = useAuth()

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { 
            errors,
            isSubmitting 
        } 
    } = useForm<PasswordFormData>({

            resolver: zodResolver(passwordSchema),
        });

    const onSubmit = async (data: PasswordFormData) => {
        try {

            //verify old password
            const verifyRes = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({ email: user?.email, password: data.currentPassword }),
            });

            if (!verifyRes.ok) throw new Error('Password is incorrect.');

            const patchRes = await fetch(`${API_BASE_URL}/users/${user?.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "text/plain",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({ password: data.newPassword }),
            });

            if (!patchRes.ok) throw new Error('Failed to update password on server.');

            toast.success('Password updated Successfully!')
            reset();
        }
        catch (err: unknown) {
            const errMsg = err instanceof Error ? err.message : 'Password update Failed';
            toast.error(errMsg);
        }
    };

    return (
        <div className={styles['form-cont']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Update Password</h3>

                <div className={styles['field']}>

                    <label>Current Password</label>
                    <input 
                        type="password" 
                        {...register('currentPassword')} 
                        placeholder="Current password"
                        autoComplete="current-password"
                    />

                    {errors.currentPassword && <p className={styles['error-text']}>{errors.currentPassword.message}</p>}
                </div>
                <div className={styles['field']}>

                    <label>New Password</label>
                    <input 
                        type="password" 
                        {...register('newPassword')} 
                        placeholder="New password"
                        autoComplete="new-password"
                    />

                    {errors.newPassword && <p className={styles['error-text']}>{errors.newPassword.message}</p>}
                </div>
                <div className={styles['field']}>

                    <label>Confirm new password</label>
                    <input 
                        type="password" 
                        {...register('confirmPassword')} 
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                    />

                    {errors.confirmPassword && <p className={styles['error-text']}>{errors.confirmPassword.message}</p>}
                </div>

                <button     
                    type="submit"
                    className={styles['submit-btn']}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
}
