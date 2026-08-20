import React from 'react'

import styles from './SignIn.module.css';

export const SignIn = () => {
  return (
    <div className={styles['signIn-cont']}>

        <div className={styles['sign-holder']}>

            <div className={styles['sign-heading']}>

                <span>Sign In</span>

            </div>
            <div className={styles['form-holder']}>

                <form className={styles['form']}>

                    <div className={styles['form-email']}>

                        <label>Email:</label>
                        <input type='text'/>

                    </div>
                    <div className={styles['form-psd']}>

                        <label>Password:</label>
                        <input type='password'/>

                    </div>
                    <div className={styles['form-btn']}>

                        <button>Sign In</button>

                    </div>
                    <div className={styles['form-text']}>

                        <p className={styles['form']}>

                            Don't have an account? 

                            <span className={styles['form']}>

                                Sign Up

                            </span>
                            
                        </p>
                    </div>
                </form>

            </div>
            
        </div>
        
    </div>
  )
}
