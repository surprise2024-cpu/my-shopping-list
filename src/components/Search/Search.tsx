import React, { useState } from 'react'

import styles from './Search.module.css';
import searchIcon from '../../assets/search.png'
import { useNavigate } from 'react-router';

export const Search = () => {

    const navigate = useNavigate()

    const [query, setQuery] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

  return (
    <div className={styles['search-cont']}>

        <div className={styles['search-bar']}>

            <div className={styles['search-icon']}>

                <img src={searchIcon} alt='search icon' />

            </div>
            <div className={styles['search-input']}>

                <input 
                    type='text' 
                    placeholder='Search....'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}/>

            </div>
        </div>

        
    </div>
  )
}
