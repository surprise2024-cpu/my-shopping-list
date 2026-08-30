

import styles from './Profile.module.css'

import person from '../../assets/person.png'
import greater from '../../assets/greater-than-symbol.png'
import Logout from '../../assets/log-out.png'
import settings from '../../assets/setting.png'
import notifications from '../../assets/notification.png'

import { NavLink } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../../store/useAuth'
import { ProfileForm } from './ProfileInfo'
import { useState, type ChangeEvent } from 'react'
import { useUi } from '../../store/useUi'
import { useUpdateUserMutation } from '../../store/api/apiSlice'
import { EditProfileModal } from './EditProfileModal'

type Panel = 'none' | 'settings' | 'notifications' 

export function Profile() {

  const { user, logout } = useAuth();
  const [updateUser] = useUpdateUserMutation()
  
  const { theme, toggleTheme, notificationsEnabled, toggleNotifications } = useUi()

  const [ openPanel, setOpenPanel ] = useState<Panel>('none')
  const [ showEditModal, setShowEditModal ] = useState(false)


  const handleLogout = () => {
    logout()
    toast.success('Logged out')
  }

  const togglePanel = (panel: Panel) => {
    setOpenPanel((current) => (current === panel ? 'none' : panel))
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const file = e.target.files?.[0]

    if (!file || !user) return 

    const reader = new FileReader()

    reader.onload = async () => {
      try {
        await updateUser({id: user.id, avatar: reader.result as string}).unwrap()
        toast.success('Profile photo updated')
      }
      catch {
        toast.error('Profile photo could not be updated')
      }
    }

    reader.readAsDataURL(file)
  }


  return (

    <div className={styles['profile-cont']}>

      <label className={styles['avatar-upload']}>
        { 
          user?.avatar ? (
            <img src={user.avatar} alt='Profile' className={styles['avatar-image']} />
          ) : (
            <div className={styles['avatar-placeholder']} />
            
          )
        }
        <span className={styles['avatar-edit-badge']} >✎</span>
        <input type='file'
          accept='image/*'
          onChange={handleAvatarChange}
          className={styles['avatar-input']}
          />
      </label>
        <div className={styles['profile-menu-dropdown']}>

          <div className={styles['profile-header']}>

            <strong className={styles['profile-name']}>{user?.name} {user?.surname}</strong>
            <p className={styles['profile-email']}>{user?.email}</p>
            <p className={styles['profile-cell']}>{user?.cellNumber}</p>

          </div>
        
          <button 
            className={styles['profile-btn']}
            onClick={() => setShowEditModal(true)}
          >
            <div className={styles['btn-icon']} >
              <img src={person} alt='person icon' className={styles['icon-img']} />
            </div>
            <div className={styles['btn-label']}>

              Edit Profile

            </div>
            <div className={styles['btn-icon']}>
              <img src={greater} alt='chevron icon' className={styles['chevron-img']} />
            </div>
          </button>
          
          <button 
            onClick={() => togglePanel('settings')}
            className={styles['profile-btn']}
          >
              <div className={styles['btn-icon']}>
                <img src={settings} alt='settings icon' className={styles['icon-img']} />
            </div>
            <div className={styles['btn-label']}>
              Settings
            </div>
            <div className={styles['btn-icon']}>
                <img src={greater} alt='chevron icon' className={styles['chevron-img']} />
            </div>
          </button>

          {
            openPanel === 'settings' && (
              <div className={styles['profile-menu-panel']}>
                <span>Theme</span>
                <button 
                  className={styles['panel-btn']}
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? 'dark' : 'light'}
                </button>
              </div>
            )
          }

          <button 
            className={styles['profile-btn']}
            onClick={() => togglePanel('notifications')} 
          >
            <div className={styles['btn-icon']}>
              <img src={notifications} alt='placeholder' className={styles['icon-img']} />
            </div>
            <div className={styles['btn-label']}>
              Notifications
            </div>
            <div className={styles['btn-icon']}>
              <img src={greater} alt='placeholder' className={styles['chevron-img']} />
            </div>
          </button>

          {
            openPanel === 'notifications' && (
              <div className={styles['profile-menu-panel']}>
                <span>Notifications</span>
                <button
                  className={styles['panel-btn']}
                  onClick={toggleNotifications}
                >
                  {notificationsEnabled ? 'Allow' : 'Deny'}
                </button>
              </div>
            ) 
          }

          <button 
            className={styles['profile-btn']}
            onClick={handleLogout} 
          >
            <div className={styles['btn-icon']}>
              <img src={Logout} alt='placeholder' className={styles['icon-img']}/>
            </div>
            <div className={styles['btn-label']}>
              Log Out
            </div>
            <div className={styles['btn-icon']}>
              <img src={greater} alt='placeholder' className={styles['chevron-img']}/>
            </div>
          </button>


          {
            showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} />
          }
        </div>

    </div>
    
  )
}
