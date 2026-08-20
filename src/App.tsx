import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Body } from './components/Body/Body'
import { SignIn } from './components/SignIn/SignIn'
import { SignUp } from './components/SignUp/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='app-cont'>

      <div id='scrollable'>

        <Navbar />
        {/*<Body />*/}

        {/*<SignIn />*/}
        <SignUp />
        
      </div>

      <Footer />
    </div>
  )
}

export default App
