import React, { useState } from 'react';
import axios from 'axios';
import LocationDropDown from './LocationDropDown';
import './stylesheet/TemperatureData.css';

const TemperatureData = () => {
  const [locationId, setLocationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [avgdata, setAvgData] = useState([]);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const apiToken = 'YiOwuvLZwnXFInhsGizSMRFfNhsRrzdl';

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
      throw new Error('Error fetching data');
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
      console.log(avgData)
      const minData = await fetchData('TMIN');
      console.log(minData)
      const maxData = await fetchData('TMAX');
      console.log(maxData)

      setAvgData(avgData);
      setData([...minData, ...maxData]);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="temperature-data-container">
      <h1>Fetch Temperature Data</h1>
      <div className="formbody">
        <LocationDropDown onLocationSelect={setLocationId} />
        <div className="input-group">
          <label>
            Start Date:
          </label>
          <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
        </div>
        <div className="input-group">
          <label>
            End Date:
          </label>
          <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
        </div>
        <button onClick={handleFetchData}>Fetch Data</button>
        {/* {error && <p className="error-message">{error}</p>}
        {data && (
          <div className="temperature-results">
            <h2>Temperature Data</h2>
            {avgdata.length > 0 && <p>AVG data processed</p>}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TemperatureData;
