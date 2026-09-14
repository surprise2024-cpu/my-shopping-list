import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, type PasswordFormData } from "../../schema/profileSchema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from './Profile.module.css'
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../store/useAuth";
import { useState } from "react";


export function PasswordForm() {

    const { user, token } = useAuth()

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email, password: data.currentPassword }),
            });

            if (!verifyRes.ok) throw new Error('Password is incorrect.');

            const patchRes = await fetch(`${API_BASE_URL}/users/${user?.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({ password: data.newPassword }),
            });

            if (!patchRes.ok) throw new Error('Failed to update password on server.');

            toast.success('Password updated Successfully!')
            reset();

            // hide all passwords after success
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
        catch (err: unknown) {
            toast.error((err as Error).message || 'Password update Failed')
        }
    };

    return (
        <div className={styles['form-cont']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Update Password</h3>

                <div className={styles['field']}>

                    <label>Current Password</label>

                    <div className={styles['password-wrapper']}>
                        <input 
                            type={showCurrentPassword ? 'text' : "password"} 
                            {...register('currentPassword')} 
                            placeholder="Current password"
                            autoComplete="current-password"
                        />
                        <button type="button"
                            className={styles['password-toggle']}
                            onClick={() => setShowCurrentPassword((prev) => !prev)}
                            aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                        >
                            {showCurrentPassword ? '\u{1f648}' : '\u{1f441}\u{fe0f}'}
                        </button>
                    </div>
                    

                    {errors.currentPassword && <p className={styles['error-text']}>{errors.currentPassword.message}</p>}
                </div>
                <div className={styles['field']}>

                    <label>New Password</label>

                    <div className={styles['password-wrapper']}>
                        <input 
                            type={showNewPassword ? 'text' : "password"} 
                            {...register('newPassword')} 
                            placeholder="New password"
                            autoComplete="new-password"
                        />
                        <button type="button"
                            className={styles['password-toggle']}
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            aria-label={showCurrentPassword ? 'Hide new password' : 'Show new password'}
                        >
                            {showNewPassword ? '\u{1f648}' : '\u{1f441}\u{fe0f}'}
                        </button>
                    </div>
                    

                    {errors.newPassword && <p className={styles['error-text']}>{errors.newPassword.message}</p>}
                </div>
                <div className={styles['field']}>

                    <label>Confirm new password</label>

                    <div className={styles['password-wrapper']}>
                        <input 
                            type={showConfirmPassword ? 'text' : "password"} 
                            {...register('confirmPassword')} 
                            placeholder="Confirm new password"
                            autoComplete="new-password"
                        />
                        <button type="button"
                            className={styles['password-toggle']}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={showConfirmPassword ? 'Hide new password' : 'Show new password'}
                        >
                            {showConfirmPassword ? '\u{1f648}' : '\u{1f441}\u{fe0f}'}
                        </button>
                    </div>
                    

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
