import React from 'react'

import styles from './Profile.module.css'

import standIn from '../../assets/profile-picture.png'

export const Profile: React.FC = () => {
  return (
    <div className={styles['profile-cont']}>
      <div>
        <img src={standIn} alt='placeholder' />
      </div>
    </div>
  )
}
