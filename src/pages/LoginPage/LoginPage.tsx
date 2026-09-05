
import { SignIn } from '../../components/Login/Login'

import styles from './LoginPage.module.css'

export const SignInPage = () => {
  return (
    <div className={styles['page-cont']}>
        <SignIn />
    </div>
  )
}
