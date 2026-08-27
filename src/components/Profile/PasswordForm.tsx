import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, type PasswordFormData } from "../../schema/profileSchema";
import { useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from './Profile.module.css'


export function PasswordForm() {

    const { user, token } = useAppSelector((state) => state.auth);
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
            const verifyRes = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email, password: data.currentPassword }),
            });

            if (!verifyRes.ok) throw new Error('Password is incorrect.');

            const patchRes = await fetch(`http://localhost:3001/users/${user?.id}`, {
                method: 'PATCH',
                headers: {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({ password: data.newPassword }),
            });

            if (!patchRes.ok) throw new Error('Faile to update password on server.');

            toast.success('Password updated Successfully!')
            reset();
        }
        catch (err: any) {
            toast.error(err.message || 'Password update Failed')
        }
    };

    return (
        <div className={styles['form-cont']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Update Password</h3>

                <div className={styles['']}>

                    <label>Current Password</label>
                    <input 
                        type="text" 
                        {...register('currentPassword')} 
                        placeholder="Current password"
                    />

                    {errors.currentPassword && <p className={styles['error-text']}>{errors.currentPassword.message}</p>}
                </div>
                <div className={styles['']}>

                    <label>New Password</label>
                    <input 
                        type="text" 
                        {...register('newPassword')} 
                        placeholder="New password"
                    />

                    {errors.newPassword && <p className={styles['error-text']}>{errors.newPassword.message}</p>}
                </div>
                <div className={styles['']}>

                    <label>Confirm new password</label>
                    <input 
                        type="text" 
                        {...register('confirmPassword')} 
                        placeholder="Confirm new password"
                    />

                    {errors.confirmPassword && <p className={styles['error-text']}>{errors.confirmPassword.message}</p>}
                </div>

                <button     
                    type="submit"
                    className={styles['']}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
}
