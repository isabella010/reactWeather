import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Home.css';

function RecentCity() {
    const { city, country, temp, weather, icon } = useParams();
    const tempFlag = country.toLowerCase();

    return (
        <div className="app">
            <div className="card">
                <div className="userLocation">
                    <h1>
                        {city}, {country} 
                        <img 
                            src={`http://openweathermap.org/images/flags/${tempFlag}.png`} 
                            alt={`${country} flag`} 
                        />
                    </h1>
                    <h2>Temp: {temp} °C </h2>
                    <h2>
                        {weather} 
                        <img 
                            src={`http://openweathermap.org/img/wn/${icon}.png`} 
                            alt={`Weather icon for ${weather}`} 
                        />
                    </h2>
                </div> 
            </div>
        </div>
    );
}

export default RecentCity;
