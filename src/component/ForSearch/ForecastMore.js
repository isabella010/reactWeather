import React, { useState, useEffect } from 'react';
import axios from "axios";

const ForecastMore = ({ city }) => {
    const [finalSet, setFinalSet] = useState('');
    const [finalRise, setFinalRise] = useState('');

    var currentdate = new Date();
    var tempdate = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":";
    tempdate += currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes();

    useEffect(() => {
        const fetchLocalWeather = async () => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=97eaa9d3202c18880ca8bdc602e4905d`
                );
                console.log(res);
                const sunrise = res.data.sys.sunrise * 1000;
                const sunset = res.data.sys.sunset * 1000;
                setFinalRise(new Date(sunrise).toLocaleTimeString());
                setFinalSet(new Date(sunset).toLocaleTimeString());
            } catch (err) {
                console.error(err);
            }
        };

        fetchLocalWeather();
    }, [city.id]); // Dependency array to fetch weather data when city.id changes

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
                <hr/>
                Temp min: {city.main.temp_min}, Temp max: {city.main.temp_max}, Wind speed: {city.wind.speed}m/s
                <br/>
                Humidity: {city.main.humidity}%, Pressure: {city.main.pressure}hpa
                <br/> 
                Sunrise: {finalRise} Sunset: {finalSet}
                <br/>
                Last Updated: {tempdate}
                <hr className="horizontal"/>
            </td>
        </tr>
    );
};

export default ForecastMore;
