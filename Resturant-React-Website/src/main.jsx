import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AvailableTables from './Components/AvailableTables'
import BookingForm from './Components/BookingForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="App">
        <h1>Resturant Reservation System</h1>
        <AvailableTables />
        <BookingForm />

    </div>
    
  </StrictMode>,
)
