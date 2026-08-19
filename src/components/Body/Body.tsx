import React from 'react'

import styles from './Body.module.css'
import emptyState from '../../assets/shopping.png'

export const Body: React.FC = () => {
  return (
    <div className={styles['body-cont']}>

      <div className={styles['holder']}>

        <div className={styles['body-text']}>

          <span>List is Empty</span>

        </div>
        <div className={styles['body-image']}>

          <img src={emptyState} alt='empty state' />

        </div>
        <div className={styles['body-text']}>

          <span>Add your First item today</span>

        </div>
        <div className={styles['body-btn']}>

          <button className={styles['add-btn']}>
            Add Item
          </button>

        </div>
      </div>
    </div>
  )
}
