import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TouchBtn from './assets/components/touchBtn/TouchBtn';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TouchBtn name="Max Sainsbury" width="10em" height="5em" />
    </>
  )
}

export default App
