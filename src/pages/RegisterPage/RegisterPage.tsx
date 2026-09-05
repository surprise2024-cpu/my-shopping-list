
import { SignUp } from '../../components/Register/Register'

import styles from './RegisterPage.module.css'

export const SignUpPage = () => {
  return (
    <div className={styles['page-cont']}>
        <SignUp />
    </div>
  )
}
