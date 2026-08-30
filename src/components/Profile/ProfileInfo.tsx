import React from 'react'

import styles from './Profile.module.css'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { profileSchema, type ProfileFormData } from '../../schema/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import { useUpdateUserMutation } from '../../store/api/apiSlice';
import { useAuth } from '../../store/useAuth';

export function ProfileForm() {

    const { user } = useAuth();
    const [updateUser, {isLoading}] = useUpdateUserMutation();


    const { 
        register, 
        handleSubmit, 
        formState: { 
            errors, 
            isDirty,
            isSubmitting } 
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            surname: user?.surname || '',
            email: user?.email || '',
            phone: user?.cellNumber || '',
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        if (!user) return

        try {
           await updateUser({
            id: user.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            cellNumber: data.phone,
           }).unwrap()
           
            toast.success('Profile successfully updated');
        }
        catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    return (
        <div className={styles['form-cont']}>

            <form onSubmit={handleSubmit(onSubmit)}>

                <h3>Personal information</h3>

                <div className={styles['field']}>
                    <label>Name: </label>
                    <input 
                        type='text'
                        {...register('name')}
                        placeholder='Name'
                    />

                    {
                        errors.name 
                        && 
                        <p className={styles['error-text']}>

                            {errors.name.message}
                        </p>
                    }
                </div>
                <div className={styles['field']}>
                    <label>Surname: </label>
                    <input 
                        type='text'
                        {...register('surname')}
                        placeholder='Surname'
                    />

                    {
                        errors.surname 
                        && 
                        <p className={styles['error-text']}>
                            
                            {errors.surname.message}
                        </p>
                    }
                </div>
                <div className={styles['field']}>
                    <label>Email: </label>
                    <input 
                        type='email'
                        {...register('email')}
                        placeholder='Email'
                    />

                    {
                        errors.email 
                        && 
                        <p className={styles['error-text']}>
                            
                            {errors.email.message}
                        </p>
                    }
                </div>
                <div className={styles['field']}>
                    <label>Phone: </label>
                    <input 
                        type='tel'
                        {...register('phone')}
                        placeholder='Phone'
                    />

                    {
                        errors.phone 
                        && 
                        <p className={styles['error-text']}>
                            
                            {errors.phone.message}
                        </p>
                    }
                </div>

                <button 
                    type='submit'
                    disabled={!isDirty}
                    className={styles['submit-btn']}
                >
                    {isSubmitting ? 'Saving...' : 'Save changes'}
                </button>
            </form>
        </div>
    );
}

