import React from 'react'

import styles from './Profile.module.css'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { profileSchema, type ProfileFormData } from '../../schema/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../../config';

export function ProfileForm() {
    const dispatch = useDispatch();

    const { user, token } = useAppSelector((state) => state.auth);

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
        try {
            const res = await fetch(API_BASE_URL, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Could not update profile information');
            const updatedUser = await res.json();

            dispatch(updateUser(updatedUser));
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
                <div>
                <label>Name: </label>
                <input 
                    type='text'
                    {...register('name')}
                />

                {
                    errors.name 
                    && 
                    <p className={styles['error-text']}>

                        {errors.name.message}
                    </p>
                }
                </div>
                <div>
                <label>Surname: </label>
                <input 
                    type='text'
                    {...register('surname')}
                />

                {
                    errors.surname 
                    && 
                    <p className={styles['error-text']}>
                        
                        {errors.surname.message}
                    </p>
                }
                </div>
                <div>
                <label>Email: </label>
                <input 
                    type='text'
                    {...register('email')}
                />

                {
                    errors.email 
                    && 
                    <p className={styles['error-text']}>
                        
                        {errors.email.message}
                    </p>
                }
                </div>
                <div>
                <label>Phone: </label>
                <input 
                    type='text'
                    {...register('phone')}
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
                >
                    {isSubmitting ? 'Saving...' : 'Save changes'}
                </button>
            </form>
        </div>
    );
}

