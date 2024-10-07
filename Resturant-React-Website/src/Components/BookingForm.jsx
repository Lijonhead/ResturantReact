import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [tableId, setTableId] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setBookingSuccess(false);

   
    try {
      const customerResponse = await axios.post('https://localhost:7075/api/Customer/AddCustomer', {
        customerId : 0,
        name,
        email
      });
      
      
      if (customerResponse.status === 201) {
        const customerId = await customerResponse.data.customerId; 
        
        
        
        const bookingDetails = {
            bookingId: 0, 
            fK_CustomerId: customerId, 
            fK_TableId: tableId, 
            bookingDate: date, 
            customerAmount: guests 
          
           
        };
        const availableReponse = await axios.get(`https://localhost:7075/api/Booking/available/${tableId}/${date}`)
        console.log(availableReponse)
        
        if(availableReponse.data.isAvailable){
            const bookingResponse = await axios.post('https://localhost:7075/api/Booking/AddBooking', bookingDetails);
            if (bookingResponse.status === 201) {
                setBookingSuccess(true);
              } else {
                setError('Failed to create booking. Please try again.');
              }
            console.log('hello')
        }else {
            setError('That day is unavailable try another date')
        }

      } else {
        setError('Failed to create customer. Please try again.');
      }
    } catch (err) {
      setError('Error processing your request: ' + err.message);
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book a Table</h3>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <label>
        Number of Guests:
        <input type="number" value={guests} min="1" onChange={(e) => setGuests(e.target.value)} required />
      </label>
      <label>
        Table Number:
        <input type="text" value={tableId} onChange={(e) => setTableId(e.target.value)} required />
      </label>
      <button type="submit">Submit Booking</button>
      {bookingSuccess && <p>Booking Confirmed!</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
}

export default BookingForm;
