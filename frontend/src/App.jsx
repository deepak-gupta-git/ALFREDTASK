import { useState } from 'react'
import './App.css'
import FlashcardApp from "./Components/FlashcardApp"

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <FlashcardApp/>
   </div>
  )
}

export default App
