import React from 'react';
import './Forecast.css';

const ForecastMain = ({ city, handleClick }) => {
    return (
        <tr align="center" className="tableRow">
            <td className="tableD">
                <hr className="horizontal"/>
                <img 
                    src={`http://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`} 
                    alt={`${city.sys.country} flag`} 
                /> 
                {city.name}, {city.sys.country}
                <br/>
                Current Temperature: {city.main.temp}°C, {city.weather[0].main} 
                <img 
                    src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} 
                    alt={`Weather icon for ${city.weather[0].main}`} 
                />
                <br/>
                <button type="button" onClick={(event) => handleClick(event, city)}>More</button>
                <hr className="horizontal"/>
            </td>
        </tr>
    );
};

export default ForecastMain;
