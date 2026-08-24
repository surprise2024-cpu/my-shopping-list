{/*import { useState } from 'react'*/}
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'

import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { Profile } from './components/Profile/Profile'
import { ToastContainer } from 'react-toastify'

function App() {
  {/*const [count, setCount] = useState(0)*/}

  return (
    <div id='app-cont'>

      <div id='scrollable'>

        <Navbar />
        {/*<Routes>
          <Route index element = {<HomePage />} />
          <Route path='signup-page' element={<SignUpPage />}/>
          <Route path='signin-page' element={<SignInPage />}/>
          <Route path='profile-page'element={<ProfilePage />}
        </Routes>*/}

        <Profile />
        
      </div>

      <Footer />
      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  )
}

export default App
