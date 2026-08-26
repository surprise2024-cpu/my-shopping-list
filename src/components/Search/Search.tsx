import React from 'react'

import styles from './Search.module.css';
import searchIcon from '../../assets/search.png'

export const Search = () => {
  return (
    <div className={styles['search-cont']}>

        <div className={styles['search-bar']}>

            <div className={styles['search-icon']}>

                <img src={searchIcon} alt='search icon' />

            </div>
            <div className={styles['search-input']}>

                <input type='text' placeholder='Search....'/>

            </div>
        </div>

        
    </div>
  )
}
