import React from 'react'

import styles from './SignIn.module.css';

export const SignIn: React.FC = () => {
  return (
    <div className={styles['form-cont']}>

        <form className={styles['signIn-form']}>

            <div className={styles['form-heading']}>

                <span>Sign In</span>

            </div>
            <div className={styles['form-section']}>

                <div className={styles['fields']}>

                    <div className={styles['field']}>

                        <label>Email:</label>
                        <input type='text' placeholder='****@gmail.com'/>

                    </div>
                </div>
                <div className={styles['fields']}>

                    <div className={styles['field']}>

                        <label>Password:</label>
                        <input type='password'/>

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

                    <p className={styles['']}>

                        Don't have an account? 

                        <span className={styles['']}>

                            Sign Up

                        </span>
                        
                    </p>
                </div>
            </div>
        </form>
    </div>
  )
}
