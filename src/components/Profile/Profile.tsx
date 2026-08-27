

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
import { useState } from 'react'
import { current } from '@reduxjs/toolkit'

type Panel = 'none' | 'settings' | 'notifications' 

export function Profile() {

  const { user, logout } = useAuth();
  
  //const { theme, toggleTheme, notificationsEnables, toggleNotifications } = useUi()

  const [ isOpen, setIsOpen ] = useState(false)
  const [ openPanel, setOpenPanel ] = useState<Panel>('none')



  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    setIsOpen(false)
  }

  const togglePanel = (panel: Panel) => {
    setOpenPanel((current) => (current === panel ? 'none' : panel))
  }

  const handleEdit = () => {
    <ProfileForm />
  }

  return (

    <div className={styles['profile-cont']}>
      <button onClick={() => setIsOpen((open) => !open)}>
        { 
          user?.avatar ? (
            <img src={user.avatar} alt='Profile' width={32} height={32} style={{ borderRadius: '50%' }}/>
          ) : (
            <div style={{width: 32,  height: 32, borderRadius: '50%', background: '#ccc'}} />
            
          )
        }
      </button>

      {
        isOpen && (
          <div className='profile-menu-dropdown'>

            <div>

              <strong>{user?.name} {user?.surname}</strong>
              <p>{user?.email}</p>
              <p>{user?.cellNumber}</p>

            </div>
            

            <NavLink
              to='/ProfileForm'
              onClick={() => setIsOpen(false)}
            >
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
            </NavLink>
            <button 
              onClick={() => togglePanel('settings')}
              className={styles['profile-btn']}
            >
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

            {
              openPanel === 'settings' && (
                <div className='profile-menu-panel'>
                  <span>Theme</span>
                  <button 
                    //onClick={toggleTheme}
                  >
                    {/*{theme === 'light' ? 'dark' : 'light'}*/}toggle
                  </button>
                </div>
              )
            }

            <button 
              className={styles['profile-btn']}
              onClick={() => togglePanel('notifications')} 
            >
              <div>
                <img src={Logout} alt='placeholder' width={30} height={30} />
              </div>
              <div>
                Notifications
              </div>
              <div>
                <img src={greater} alt='placeholder' width={10} height={10} />
              </div>
            </button>

            {
              openPanel === 'notifactions' && (
                <div className='profile-menu-panel'>
                  <span>Notifications</span>
                  <button
                    //onClick={toggleNotifications}
                  >
                    {/*{notificationsEnables ? 'Allow' : 'Deny'}*/}Notifications
                  </button>
                </div>
              ) 
            }

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

          
        )
      }

    </div>


    
  )
}
