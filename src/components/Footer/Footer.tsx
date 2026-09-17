import React from 'react'

import styles from './Footer.module.css'

import copyright from '../../assets/copyright-symbol.png'

export const Footer: React.FC = () => {
  return (
    <footer>

        <div className={styles['footer-text-cont']}>

            <div className={styles['footer-text-icon']}>

                <img className={styles['copyright-icon']} src={copyright} alt='copyright icon' />

            </div>
            <div className={styles['footer-text']}>

                <span>2026 ShopLify. All rights reserved.</span>
                
            </div>
            
        </div>
        
    </footer>
  )
}
