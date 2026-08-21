import React from 'react'

import styles from './SignUp.module.css'

export const SignUp: React.FC = () => {
  return (
    <div className={styles['form-cont']}>
        <form className={styles['signUp-form']}>

            <div className={styles['heading']}>

                <span>Sign Up</span>
            </div>
            <div className={styles['field-cont']}>

                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Name: </label>
                        <input type='text' placeholder='Name....'/>

                    </div>
                </div>
                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Surname: </label>
                        <input type='text' placeholder='Surname....'/>

                    </div>
                </div>
                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Email: </label>
                        <input type='email' placeholder='*****@gmail.com'/>

                    </div>
                </div>
                <div className={styles['fields']}> 

                    <div className={styles['field']}>

                        <label>Password: </label>
                        <input type='password' placeholder='********'/>

                    </div>
                </div>
                <div className={styles['field-btn-cont']}>

                    <div className={styles['field']}>

                        <button className={styles['field-btn']}>
                            Sign Up
                        </button>

                    </div>
                </div>
                <div className={styles['field-redirect']}>

                    <p>

                        Already have an account? 
                        <span>

                            Sign In
                        </span>
                    </p>
                </div>
            </div>
        </form>
    </div>
    
  )
}
