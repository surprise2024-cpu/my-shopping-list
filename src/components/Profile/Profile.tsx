import React from 'react'

import styles from './Profile.module.css'

import standIn from '../../assets/profile-picture.png'
import person from '../../assets/person.png'
import greater from '../../assets/greater-than-symbol.png'
import logout from '../../assets/log-out.png'
import settings from '../../assets/setting.png'
import { NavLink } from 'react-router'

export const Profile: React.FC = () => {
  return (
    <div className={styles['profile-cont']}>


      <div className={styles['placeholder']}>
        
          <img src={standIn} alt='placeholder' width={80} height={80}/>
      </div>

      
      <div className={styles['profile-info']}>

        
        <button className={styles['profile-btn']}>
          <div >
            <img src={person} alt='placeholder' width={30} height={30} />
         </div>
         <div>
            <NavLink 
                to={'/'} 
                className={ ({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}
            >
              Edit Profile
            </NavLink>
         </div>
         <div>
            <img src={greater} alt='placeholder' width={10} height={10} />
         </div>
        </button>
        <button className={styles['profile-btn']}>
          <div>
            <img src={settings} alt='placeholder' width={30} height={30} />
         </div>
         <div>
            Settings
         </div>
         <div>
            <img src={greater} alt='placeholder' width={10} height={10} />
         </div>
        </button>
        <button className={styles['profile-btn']}>
          <div>
            <img src={logout} alt='placeholder' width={30} height={30} />
         </div>
         <div>
            Log Out
         </div>
         <div>
            <img src={greater} alt='placeholder' width={10} height={10} />
         </div>
        </button>
      </div>
    </div>
  )
}
