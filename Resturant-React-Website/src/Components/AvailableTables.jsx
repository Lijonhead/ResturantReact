import React, { useState } from 'react';
import axios from 'axios';

function AvailableTables() {
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState(1)
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAvailableTables = async () => {
        if(!date) {
            setError('Please select a valid date.');
            setTables([]);
            return;
        }
        if(guests < 1){
            setError('Please enter a valid number of guests');
            setTables([])
            return
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://localhost:7075/api/Table/AvailableTables/${date}/${guests}`);
            setTables(response.data);
            setLoading(false);
        }catch (err) {
            setError('Failed to fetch available tables.');
            setTables([]);
            setLoading(false)
            console.error(err)
        }

    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
        if(guests && event.target.value) {
            fetchAvailableTables();
        }
        
    };

    const handleGuestsChange = (event) => {
        setGuests(event.target.value)
        if(date && event.target.value){
            fetchAvailableTables();
        }
    }

    return (
        <div>
            <h2>Check Available Tables</h2>
            <div>
                <label htmlFor="date">
                    Select Date:
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label htmlFor="guests">
                    Number of Guests:
                    <input
                        type="number"
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min="1"  
                    />
                </label>
                <button onClick={fetchAvailableTables}>Check Availability</button>
            </div>
            {loading && <p>Loading tables...</p>}
            {error && <p>{error}</p>}
            <ul>
                {tables.length > 0 ? (
                    tables.map(table => (
                        <li key={table.tableId}>
                            Table Number: {table.tableNumber}, Capacity: {table.capacity}
                        </li>
                    ))
                ) : (
                    <p>No tables available for the selected date and number of guests.</p>
                )}
            </ul>
        </div>
    )

}

export default AvailableTables;