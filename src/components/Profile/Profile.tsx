import React from 'react'

import styles from './Profile.module.css'

import standIn from '../../assets/profile-picture.png'
import person from '../../assets/person.png'
import greater from '../../assets/greater-than-symbol.png'
import Logout from '../../assets/log-out.png'
import settings from '../../assets/setting.png'
import { NavLink } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../../store/useAuth'
import { ProfileForm } from './ProfileInfo'

export const Profile: React.FC = () => {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
  }

  const handleEdit = () => {
    <ProfileForm />
  }

  return (
    <div className={styles['profile-cont']}>

      <div className={styles['holder']}>

        <div className={styles['placeholder']}>
        
          <img src={standIn} alt='placeholder' width={80} height={80}/>

        </div>
        <div className={styles['holder-text']}>
          <div >king</div>
          <div>king2gmail.com</div>
          <div>0147536915</div>
        </div>
      </div>

      
      <div className={styles['profile-info']}>

        
        <button 
          className={styles['profile-btn']}
          onClick={handleEdit}
        >
          <div >
            <img src={person} alt='placeholder' width={30} height={30} />
         </div>
         <div>

            Edit Profile

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
            <NavLink 
                to={'/'} 
                className={ ({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}
            >
              Settings
            </NavLink>
         </div>
         <div>
            <img src={greater} alt='placeholder' width={10} height={10} />
         </div>
        </button>
        <button 
          className={styles['profile-btn']}
          onClick={handleLogout} 
        >
          <div>
            <img src={Logout} alt='placeholder' width={30} height={30} />
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
