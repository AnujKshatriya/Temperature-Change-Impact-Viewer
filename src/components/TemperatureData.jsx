import React, { useState } from 'react';
import axios from 'axios';
import LocationDropDown from './LocationDropDown';

const TemperatureData = () => {
  const [locationId, setLocationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [avgdata, setAvgData] = useState([])
  const [error, setError] = useState('');
  const  [data,setData] = useState([])

  const apiToken = 'YiOwuvLZwnXFInhsGizSMRFfNhsRrzdl'; // Replace with your actual API key

  const fetchData = async (datatypeid) => {
    const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/data';

    const params = {
      datasetid: 'GHCND',
      locationid: locationId,
      startdate: startDate,
      enddate: endDate,
      datatypeid,
      units: 'metric',
      limit: 1000,
      offset: 1
    };

    try {
      const response = await axios.get(url, {
        headers: { token: apiToken },
        params
      });
      return response.data.results;
    } catch (err) {
      throw new Error('Error fetching data',);
    }
  };

  const handleFetchData = async () => {
    if (!locationId) {
      setError('Invalid location ID');
      return;
    }

    setError('');

    try {
      const avgData = await fetchData('TAVG');
      console.log("Average temperature data for given interval : ",avgData)
      const minData = await fetchData('TMIN');
      console.log("Minimum temperature data for given interval : ",minData)
      const maxData = await fetchData('TMAX');
      console.log("Maximum temperature data for given interval : ",maxData)

      setAvgData(avgData)

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Fetch Temperature Data</h1>
      <LocationDropDown onLocationSelect={setLocationId} />
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleFetchData}>Fetch Data</button>
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>Temperature Data</h2>
          {
            <div>
              {avgdata.length>0 && <p>AVG data processed</p>}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default TemperatureData;
