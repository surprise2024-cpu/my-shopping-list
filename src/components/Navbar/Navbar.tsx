import { useState } from 'react'

import styles from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../store/useAuth';
import { toast } from 'react-toastify';
import { continueAsGuest, exitGuest } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';

export const Navbar = () => {

    const { isAuthenticated, isGuest, logout } = useAuth()

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const handleLogout = () => {
        logout()
        setIsMenuOpen(false)
        toast.success('Logged out successfully')
        navigate('/login')
    }

    const handleGuestMode = () => {
        dispatch(continueAsGuest())
        setIsMenuOpen(false)
        toast.info('You are browsing as a guest. Your lists are saved on this device only.')
        navigate('/')
    }

    const handleExitGuest = () => {
        dispatch(exitGuest())
        setIsMenuOpen(false)
        toast.info('Guest mode ended')
        navigate('/login')
    }

    const handleGuestLogin = () => {
        setIsMenuOpen(false)
        navigate('/login')
    }

    const handleGuestRegister = () => {
        setIsMenuOpen(false)
        navigate('/register')
    }

  return (
    <nav className={styles['nav']}>

        <div className={styles['nav-cont']}>
             
            <div className={styles['nav-heading']}>
                <NavLink to='/'
                    className={styles['brand-link']}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <h2>ShopLify</h2>
                </NavLink>
            </div>

            <button className={styles['hamburger-btn']}
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label='Toggle menu'
                aria-expanded={isMenuOpen}
            >
                ☰
            </button>

            <div className={`${styles['nav-collapsible']} ${isMenuOpen ? styles['nav-open'] : ''}`}>
                
                <div className={styles['links']}>

                    {
                        isGuest ? (
                            <>
                                <button
                                    type='button'
                                    className={styles['link']}
                                    onClick={handleExitGuest}
                                >
                                    Exit Guest Mode
                                </button>
                                <button
                                    type='button'
                                    className={styles['link']}
                                    onClick={handleGuestRegister}
                                >
                                    Register
                                </button>
                                <button
                                    type='button'
                                    className={styles['link']}
                                    onClick={handleGuestLogin}
                                >
                                    Login
                                </button>
                            </>

                        ) : !isAuthenticated ? (
                            <>
                                <button
                                    type='button'
                                    className={styles['link']}
                                    onClick={handleGuestMode}
                                >
                                    Guest Mode
                                </button>
                                <NavLink 
                                to={'/register'} 
                                className={ ({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </NavLink>

                                <NavLink 
                                    to={'/login'} 
                                    className={ ({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to={'/'}
                                    className={({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}    
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </NavLink>
                                <NavLink to={'/profile'}
                                className={({isActive}) => `${styles.link} ${isActive ? styles['link-active'] : ''}`}    
                                onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </NavLink>

                                
                            </>
                        )
                    }
                    
                </div>

            </div>
            
        </div>
    </nav>
  )
}
