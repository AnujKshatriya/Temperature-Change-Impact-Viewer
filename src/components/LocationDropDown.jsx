// LocationDropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationDropDown = ({onLocationSelect}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');

  const apiToken = 'YiOwuvLZwnXFInhsGizSMRFfNhsRrzdl';

  useEffect(() => {
    const fetchCountries = async () => {
      const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations';
      const params = {
        locationcategoryid: 'CNTRY', // Category ID for countries
        sortfield: 'name',
        sortorder: 'asc',
        limit: 1000
      };

      try {
        const response = await axios.get(url, {
          headers: { token: apiToken },
          params
        });
        console.log(response.data)
        setCountries(response.data.results);
      } catch (err) {
        setError('Error fetching countries');
      }
    };

    fetchCountries();
  }, [apiToken]);

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    
    console.log(countryId.split(":")[1])
    
    setSelectedCountry(countryId);
    setSelectedCity('');
    setCities([]);

    const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations';
    const params = {
      locationcategoryid: 'CITY',
      sortfield: 'name',
      sortorder: 'asc',
      limit: 1000,
      datacategoryid: countryId // Filter by selected country
    };

    try {
      const response = await axios.get(url, {
        headers: { token: apiToken },
        params
      });
      
      const filteredCities = response.data.results.filter((city)=>(city.name.split(",")[1].includes(countryId.split(":")[1])))
  
      setCities(filteredCities);
    } catch (err) {
      setError('Error fetching cities');
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    console.log(cityId)
    setSelectedCity(cityId);
    onLocationSelect(cityId);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">--Select Country--</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div>
          <label htmlFor="city">Select City:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">--Select City--</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationDropDown;
