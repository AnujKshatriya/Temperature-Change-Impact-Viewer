import React from 'react'
import TemperatureData from './components/TemperatureData'
import Header from './components/Header'
const App = () => {
  return (
    <div>
      <Header/>
      <div className='tempdata'>
        <TemperatureData/>
      </div>
    </div>
  )
}

export default App
