import { useState } from 'react'

import Description from './Description'
import Calendar from './Calendar'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container flex justify-between'>
          <Calendar />
          <Description/>
      </div>
      
    </>
  )
}

export default App
