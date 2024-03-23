import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import DateTimePicker from './DateTimePicker'
import { DateAndTime } from './types/DateAndTime'

function App() {
  const [count, setCount] = useState(0)

  const time: DateAndTime = {
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
  };

  return (
    <>
      <DateTimePicker defaultTime={time}/>
    </>
  )
}

export default App
