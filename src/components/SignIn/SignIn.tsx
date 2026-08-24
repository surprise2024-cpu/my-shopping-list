import React from 'react'

import styles from './SignIn.module.css';
import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { signInSchema, type signInFormData } from '../../schema/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../store/authSlice';

export const SignIn: React.FC = () => {

    const dispatch = useDispatch();

    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<signInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (data: signInFormData) => {

        try {
            const res = await fetch('http://localhost:8000/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result || 'Invalid Details')

            dispatch(setCredentials({ token: result.aaccessToken, user: result.user }));

            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('user', JSON.stringify(result.user));

            toast.success('Signed Up successfully!')
        }
        catch (err: any) {
            const errMsg = err.response?.data || 'Failed to Sign In. Please try again.';
            toast.error(errMsg);
        }


        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

  return (
    <div className={styles['form-cont']}>

        <form 
            className={styles['signIn-form']}
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className={styles['form-heading']}>

                <span>Sign In Form</span>

            </div>
            <div className={styles['form-section']}>

                <div className={styles['fields']}>

                    <div className={styles['field']}>

                        <label>Email:</label>
                        <input 
                            type='email' 
                            {...register('email')} 
                            placeholder='****@gmail.com'
                        />
                        {
                            errors.email 
                            && 
                            <p className={styles['error-text']}>{errors.email.message}</p>
                        }

                    </div>
                </div>
                <div className={styles['fields']}>

                    <div className={styles['field']}>

                        <label>Password:</label>
                        <input 
                            type='password'
                            {...register('password')}
                            placeholder='********'
                        />
                        
                        {
                            errors.password 
                            && 
                            <p className={styles['error-text']}>{errors.password.message}</p>
                        }

                    </div>
                </div>
                <div className={styles['field-btn-cont']}>

                    <div className={styles['field']}>

                        <button 
                            type='submit'
                            className={styles['field-btn']}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>

                    </div>
                </div>
                <div className={styles['field-redirect']}>

                    <p className={styles['redirect-text']}>

                        Don't have an account? 

                        <NavLink 
                            to={'/signup-page'} 
                            className={styles['']} 
                        >

                            Sign Up

                        </NavLink>
                    </p>
                </div>
            </div>
        </form>
    </div>
  )
}
