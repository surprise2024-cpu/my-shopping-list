{/*import { useState } from 'react'*/}
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'

import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/LoginPage'
import { SignUpPage } from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import { ProtectedRoute, PublicOnlyRoute } from './RouteWrappers'
import { ProfilePage } from './pages/ProfilePage'
import { ListDetailsPage } from './pages/ListDetailPage'
import { useAuth } from './store/useAuth'
import { SearchResultsPage } from './pages/SearchResultsPage'

function App() {

  const {isAuthenticated} = useAuth(); 

  return (
    <div id='app-cont'>

      <Navbar />
      
      <div id='scrollable'>

        
        <Routes>

          <Route element={<PublicOnlyRoute isAuthenticated={isAuthenticated} />}>

            <Route path='register' element={<SignUpPage />}/>
            <Route path='login' element={<SignInPage />}/>
            

          </Route>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route index element = {<HomePage />} />
            <Route path='profile' element = {<ProfilePage />} />
            <Route path='lists/:id' element={<ListDetailsPage />} />
            <Route path='search' element={<SearchResultsPage />} />
          </Route>

          
        </Routes>
        
      </div>

      <Footer />
      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  )
}

export default App
