import React from 'react'
import { Profile } from '../../components/Profile/Profile'

import styles from './ProfilePage.module.css'

export const ProfilePage: React.FC = () => {
  return (
    <div className={styles['profile-page']}>
        <Profile />
    </div>
  )
}
