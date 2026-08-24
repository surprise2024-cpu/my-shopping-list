import React from 'react'

import styles from './SignIn.module.css';
import { NavLink } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { signInSchema, type SignInFormData } from '../../schema/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignIn: React.FC = () => {

    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Sign In data: ', data)
    }

  return (
    <div className={styles['form-cont']}>

        <form className={styles['signIn-form']}>

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

                        <button className={styles['field-btn']}>
                            Sign In
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
