import { useState } from "react"
import { useForm } from "react-hook-form"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../../schema/authSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { API_BASE_URL } from "../../config"
import { toast } from "react-toastify"
import styles from './ForgotPasswordModal.module.css'


interface ForgotPasswordModalProps {
    onClose: () => void
}

export function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {

    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '', newPassword: '', confirmPassword: '' }
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {

        try {

            const res = await fetch(`${API_BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ email: data.email, newPassword: data.newPassword }),
            })

            const result = await res.json()
            if (!res.ok) throw new Error(typeof result === 'string' ? result : 'Could not reset password, please try again.')

            toast.success('Password updated \u2024 you can log in now')
            onClose()

        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message: 'Could not reset password')
        }
    }

    return (
        <div className={styles['modal-overlay']} onClick={isSubmitting ? undefined : onClose}>
            <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
                <h3>Reset Your Password</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles['field']}>
                        <label>Email:</label>
                        <input 
                            type="email"
                            {...register('email')}
                            placeholder="****@gmail.com"
                            disabled={isSubmitting}
                        />
                        {errors.email && <p className={styles['error-text']}>{errors.email.message}</p>}
                    </div>
                    <div className={styles['field']}>
                        <label>New Password::</label>
                        <div className={styles['password-wrapper']}>
                            <input 
                                type={showNew ? 'text' : 'password'}
                                {...register('newPassword')}
                                placeholder="********"
                                disabled={isSubmitting}
                            />
                            <button 
                                type="button"
                                className={styles['password-toggle']}
                                onClick={() => setShowNew((p) => !p)}
                                tabIndex={-1}
                            >
                                {showNew ? '\u{1f648}' : '\u{1f441}\u{fe0f}'}
                            </button>
                        </div>
                        
                        {errors.newPassword && <p className={styles['error-text']}>{errors.newPassword.message}</p>}
                    </div>
                    <div className={styles['field']}>
                        <label>Confirm Password::</label>
                        <div className={styles['password-wrapper']}>
                            <input 
                                type={showConfirm ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                placeholder="********"
                                disabled={isSubmitting}
                            />
                            <button 
                                type="button"
                                className={styles['password-toggle']}
                                onClick={() => setShowConfirm((p) => !p)}
                                tabIndex={-1}
                            >
                                {showConfirm ? '\u{1f648}' : '\u{1f441}\u{fe0f}'}
                            </button>
                            
                        </div>
                        
                        {errors.confirmPassword && <p className={styles['error-text']}>{errors.confirmPassword.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        className={styles['field-btn']}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Reset Password'}
                    </button>
                    <button 
                        type="button"
                        className={styles['cancel-btn']}
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )

}