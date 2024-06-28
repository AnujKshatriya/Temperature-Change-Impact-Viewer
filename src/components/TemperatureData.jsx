import React, { useState,useEffect } from 'react';
import axios from 'axios';
import LocationDropDown from './LocationDropDown';
import TemperatureChart from './TemperatureChart';
import './stylesheet/TemperatureData.css';

const TemperatureData = () => {
  const [locationId, setLocationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [avgData, setAvgData] = useState([]);
  const [minData, setMinData] = useState([]);
  const [maxData, setMaxData] = useState([]);
  const [datasetid,setDatasetid] = useState("");
  const [error, setError] = useState('');

  const apiToken = 'YiOwuvLZwnXFInhsGizSMRFfNhsRrzdl';

  useEffect(() => {
    if (startDate && endDate) {
      calculateMonthDifference(startDate, endDate);
    }
  }, [startDate, endDate]);

  const calculateMonthDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const diffYears = end.getFullYear() - start.getFullYear();
    const diffMonths = (diffYears * 12) + (end.getMonth() - start.getMonth());
    if(diffMonths>6){
      setDatasetid("GSOM")
    }
    else{
      setDatasetid("GHCND")
    }
  }
  
  const fetchData = async (datatypeid) => {
    const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/data';

    const params = {
      datasetid : datasetid ,
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
      // console.log("fetchdata error : ", err)
      throw new Error(err.message);
    }
  };

  const handleFetchData = async () => {
    if (!locationId) {
      setError('Invalid location ID');
      return;
    }

    setError('');

    try {
      const avgdata = await fetchData('TAVG');
      const mindata = await fetchData('TMIN');
      const maxdata = await fetchData('TMAX');

      setAvgData(avgdata);
      setMinData(mindata);
      setMaxData(maxdata);
    } catch (err) {
      // console.log(err)
      setError(err.message + ", Please fetch data again");
    }
  };

  return (
    <div className="TemperatureData-main">
      <div className="temperature-data-container">
        <h1>Fetch Temperature Data</h1>
        <div className="formbody">
          <LocationDropDown onLocationSelect={setLocationId} setError={setError} />
          <div className="input-group">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) =>{ setStartDate(e.target.value)
              }}
            />
          </div>
          <div className="input-group">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {setEndDate(e.target.value)
              }}
            />
          </div>
          <button onClick={handleFetchData}>Fetch Data</button>
        </div>
      </div>
      <div className="graphDisplay">
      {error && <p className="error-message">{error}</p>}
        {(avgData!=undefined && avgData.length > 0 || minData!=undefined && minData.length > 0 || maxData!=undefined && maxData.length > 0) && (
          <TemperatureChart
            avgData={avgData}
            minData={minData}
            maxData={maxData}
            height={700}  
            width={790}  
          />
        )}
      </div>
    </div>
    
  );
};

export default TemperatureData;