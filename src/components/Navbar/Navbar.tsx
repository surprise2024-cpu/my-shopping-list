import React from 'react'

import styles from './Navbar.module.css'

export const Navbar = () => {
  return (
    <nav className={styles['nav-cont']}>

        <div className={styles['nav-heading']}>

            <h2>My Shopping List</h2>

        </div>
        <div className={styles['nav-search']}>

            Search

        </div>
        <div className={styles['nav-links']}>

            <div className={styles['nav-link']}>

                <span>Sign Up</span>

            </div>
            <div className={styles['nav-link']}>

                <span>Sign In</span>

            </div>

        </div>
        
    </nav>
  )
}
