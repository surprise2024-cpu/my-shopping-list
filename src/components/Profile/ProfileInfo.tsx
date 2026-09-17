import { useRef } from 'react'

import styles from './Profile.module.css'
import { useForm } from 'react-hook-form';
import { profileSchema, type ProfileFormData } from '../../schema/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../store/api/apiSlice';
import { useAuth } from '../../store/useAuth';

export function ProfileForm() {

    const { user } = useAuth();
    const [updateProfile, {isLoading}] = useUpdateUserMutation();

    // locks submissions immediately
    const submitLock = useRef(false);
    // const submitButtonRef = useRef<HTMLButtonElement>(null);

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

        if (!user) return;

        // locks immmediately
        if (submitLock.current) {
            return;
        }

        submitLock.current = true;

        try {
           const result = await updateProfile({
            id: user.id,
            name: data.name,
            surname: data.surname,
            cellNumber: data.phone,
           }).unwrap()

           // newly added
            console.log('UPDATE SUCCESS:', result);
           
            toast.success('Profile successfully updated', {
                toastId: 'profile-update-success'
            });

        } catch (error: any) {

            console.log('PROFILE UPDATE ERROR:', error);

            toast.error(
                error?.data?.message ||
                error?.message ||
                'Something went wrong', 
                {
                    toastId: 'profile-update-error'
                }
            );

        } finally {

            //unlock after request finishes
            submitLock.current = false;

            {/*if (submitButtonRef.current) {
                submitButtonRef.current.disabled = false;
            }*/}

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
                        disabled
                        className={styles['email-input']}
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
                    //ref={submitButtonRef}
                    type='submit'
                    disabled={!isDirty || isLoading || isSubmitting}
                    className={styles['submit-btn']}
                >

                    {isLoading || isSubmitting ? 'Saving...' : 'Save changes'}

                </button>
            </form>
        </div>
    );
}

