import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import DateTimePicker from './DateTimePicker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DateTimePicker/>
    </>
  )
}

export default App
