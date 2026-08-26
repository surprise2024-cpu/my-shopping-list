import React from 'react'

import search from '../../assets/shopping.png';

import styles from './Navbar.module.css'
import { Search } from '../Search/Search';
import { NavLink } from 'react-router';

export const Navbar = () => {
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
            </div>
        </div>
    </nav>
  )
}
