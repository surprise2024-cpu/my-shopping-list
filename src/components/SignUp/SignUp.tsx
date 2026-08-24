import React from 'react'

import styles from './SignUp.module.css'
import { NavLink } from 'react-router'
import { signUpSchema, type signUpFormData } from '../../schema/authSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'

export const SignUp: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<signUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: '', surname: '', email: '', phone: '', password: '', confirmPassword: ''},
    });

    const onSubmit: SubmitHandler<signUpFormData> = async (data) => {

        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Sign up Data: ', data);
    };

  return (
    <div className={styles['form-cont']}>
        <form 
            className={styles['signUp-form']}
            onSubmit={handleSubmit(onSubmit)}>

            <div className={styles['heading']}>

                <span>Sign Up Form</span>
                
            </div>
            <div className={styles['field-cont']}>

                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Name: </label>
                        <input 
                            type='text'
                            {...register('name')}
                            placeholder='Name....'
                        />
                        {errors.name && <p className={styles['error-text']}>{errors.name.message}</p>}
                    </div>
                </div>
                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Surname: </label>
                        <input 
                            type='text' 
                            {...register('surname')}
                            placeholder='Surname....'
                        />
                        {errors.surname && <p className={styles['error-text']}>{errors.surname.message}</p>}
                    </div>
                </div>
                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Email: </label>
                        <input 
                            type='email' 
                            {...register('email')}
                            placeholder='*****@gmail.com'
                        />
                        {errors.email && <p className={styles['error-text']}>{errors.email.message}</p>}
                    </div>
                </div>
                <div className={styles['fields']}>

                    <div className={styles['field']}>

                        <label>Phone Number: </label>
                        <input 
                            type='number'
                            {...register('phone')}
                            placeholder='0215789566'
                        />
                        {errors.phone && <p className={styles['error-text']}>{errors.phone.message}</p>}
                    </div>
                </div>
                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Password: </label>
                        <input 
                            type='password' 
                            {...register('password')}
                            placeholder='********'
                        />
                        {errors.password && <p className={styles['error-text']}>{errors.password.message}</p>}
                    </div>
                </div>
                <div className={styles['fields']}>

                    <div className={styles['field']}>

                        <label>Confirm password:</label>
                        <input 
                            type='password'
                            {...register('confirmPassword')}
                            placeholder='********'
                        />
                        {errors.confirmPassword && <p className={styles['error-text']}>{errors.confirmPassword.message}</p>}
                    </div>
                </div>
                <div className={styles['field-btn-cont']}>

                    <div className={styles['field']}>

                        <button 
                            type='submit'
                            className={styles['field-btn']}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </button>

                    </div>
                </div>
                <div className={styles['field-redirect']}>

                    <p>

                        Already have an account?  
                        <NavLink 
                            to={'/signin-page'} 
                            className={styles['']} 
                        >

                            Sign In

                        </NavLink>
                    </p>
                </div>
            </div>
        </form>
    </div>
  );
};
