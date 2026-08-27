import React from 'react'

import search from '../../assets/shopping.png';

import styles from './Navbar.module.css'
import { Search } from '../Search/Search';
import { NavLink } from 'react-router';
import { useAuth } from '../../store/useAuth';
import { toast } from 'react-toastify';

export const Navbar = () => {

    const { isAuthenticated, logout } = useAuth()

    const handleLogout = () => {
        logout()
        toast.success('Logged out')
    }

  return (
    <nav className={styles['nav']}>

        <div className={styles['nav-cont']}>
             
            <div className={styles['nav-heading']}>

                <h2>My Shopping List</h2>

            </div>
            <div className={styles['nav-search']}>
                
                <Search />

            </div>
            <div className={styles['links']}>

                    <NavLink 
                        to={'/'} 
                        className={ ({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}
                    >
                        Home
                    </NavLink>


                    {!isAuthenticated ? (
                        <>
                            <NavLink 
                            to={'/signup-page'} 
                            className={ ({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}
                            >
                                Sign Up
                            </NavLink>

                            <NavLink 
                                to={'/signin-page'} 
                                className={ ({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}
                            >
                                Sign In
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to={'/profile'}
                            className={({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}    
                            >
                                Profile
                            </NavLink>

                            <button 
                                className={styles.link}
                                onClick={handleLogout}
                                style={{ background: 'none', border: 'none', font: 'inherit' }}    
                            >
                                Logout
                            </button>
                        </>
                    )}
                    
            </div>
        </div>
    </nav>
  )
}
