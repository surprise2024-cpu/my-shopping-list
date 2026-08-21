{/*import { useState } from 'react'*/}
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
{/*import { Body } from './components/Body/Body'*/}
import { SignIn } from './components/SignIn/SignIn'

function App() {
  {/*const [count, setCount] = useState(0)*/}

  return (
    <div id='app-cont'>

      <div id='scrollable'>

        <Navbar />
        {/*<Body />*/}

        <SignIn />
        
        
      </div>

      <Footer />
    </div>
  )
}

export default App
