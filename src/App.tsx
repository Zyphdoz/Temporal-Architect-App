import { useState } from 'react'

import './styles/App.css'
import DateTimePicker from './DateTimePicker'
import { DateAndTime } from './types/DateAndTime'

function App() {

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
