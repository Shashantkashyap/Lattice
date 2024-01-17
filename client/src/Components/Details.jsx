// Details.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Details.css';

function Details() {
  const [hID, setHID] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://server-ki5g.onrender.com/api/fetch', { hID });
      setData(response.data.details);
      console.log(response);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  return (
    <div className="container">
      <div>
        <label htmlFor="hID"className=' text-3xl font-bold p-2'>Hospital ID</label>
        <input
        className=' p-2 shadow-md text-white font-semibold'
          type="text"
          name="hID"
          id="hID"
          value={hID}
          onChange={(e) => setHID(e.target.value)}
        />
      </div>

      <button type="submit" className=' mt-3 w-40% bg-blue-300 hover:bg-blue-500 text-xl font-semibold hover:scale-[1.01] p-2 shadow-md' onClick={handleSubmit}>
        Fetch Details
      </button>

      {data && (
        <>
          <div>
            <p className=' text-xl font-semibold p-2 text-white'>Hospital Name</p>
            <p className=' font-semibold text-xl p-2'>{data.name}</p>
          </div>

          <div>
            <p className=' text-xl font-semibold p-2 text-white'>Total Psychiatrist count</p>
            <p className=' font-semibold text-xl p-2'>{data.psychiatrists.length}</p>
          </div>

          <div>
            <p className=' text-xl font-semibold p-2 text-white'>Total patients count</p>
            <p className=' font-semibold text-xl p-2'>{data.patients.length}</p>
          </div>

          <div className="psychiatrist-details">
            <h2 className=' text-2xl text-white font-bold p-2'>Psychiatrist Details</h2>
            {data.psychiatrists.map((ele, index) => (
              <div key={index}>
                <div>
                  <p className=' text-xl font-semibold p-2 text-white'>ID:</p>
                  <p className=' font-semibold text-xl p-2'>{ele._id}</p>
                </div>
                <div>
                  <p className=' text-xl font-semibold p-2 text-white'>Name:</p>
                  <p className=' font-semibold text-xl p-2'>{ele.name} </p>
                </div>
                <div>
                  <p className=' text-xl font-semibold p-2 text-white'>Email:</p>
                  <p className=' font-semibold text-xl p-2'>{ele.email}</p>
                </div>
                <div >
                  <p className=' text-xl font-semibold p-2 text-white'>Patients:</p>
                  <p className=' font-semibold text-xl p-2'>{ele.patients.length}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
