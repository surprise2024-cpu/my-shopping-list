import React from 'react'

import styles from './Body.module.css'
import emptyState from '../../assets/shopping.png'
import addIcon from '../../assets/add-button.png'

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

            <div className={styles['add-btn-holder']}>

              <div className={styles['add-btn-icon']}>

                <img src={addIcon} alt='empty state' />

              </div>
              <div className={styles['add-btn-text']}>

                < span>Add Item</span>

              </div>
            
            </div>
          </button>

        </div>
      </div>
    </div>
  )
}
