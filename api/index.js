import { useState } from 'react';

const Home = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the subscription data
    const subscriptionData = {
      user_id: userId,
      name,
      cost,
      start_date: startDate,
      end_date: endDate,
      recurring,
    };

    try {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding subscription');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Subscription</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Subscription Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={recurring}
            onChange={() => setRecurring(!recurring)}
            className="form-checkbox"
          />
          <span>Recurring</span>
        </label>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Add Subscription
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Home;
