import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import './Home.css';

function Home() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState('');
    const [datetime, setDatetime] = useState('');
    const [countryID, setCountryID] = useState('');
    const [icon, setIcon] = useState('');
    const [error, setError] = useState('');
    
    const fetchWeather = async (lat, lon) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=97eaa9d3202c18880ca8bdc602e4905d`
            );

            if (res.data && res.data.sys && res.data.sys.country) {
                setTemp(res.data.main.temp); 
                setCity(res.data.name); 
                setIcon(res.data.weather[0].icon);
                setWeather(res.data.weather[0].main);
                setCountryID(res.data.sys.country.toLowerCase());
                
                const currentdate = new Date(); 
                const tempdate = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + (currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes());
                
                setDatetime(tempdate);
            } else {
                console.error('Unexpected API response structure:', res.data);
                setError('Unable to retrieve country information');
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching weather data');
        }
    }

    const handleGeolocation = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
                setError('Error retrieving geolocation');
            }
        );
    };

    return (
        <div className="app">
            <ReactBootStrap.Card body className="card">
                <div className="userLocation">
                    <button onClick={handleGeolocation}>Get Weather</button>
                    {error ? (
                        <h2>{error}</h2>
                    ) : (
                        <>
                            <h1>{city} 
                                <img 
                                    src={`http://openweathermap.org/images/flags/${countryID}.png`} 
                                    alt={`${countryID} flag`} 
                                />
                            </h1>
                            <h2>{datetime}</h2>
                            <h2>{temp} °C</h2>
                            <h2>{weather} 
                                <img 
                                    src={`http://openweathermap.org/img/wn/${icon}.png`} 
                                    alt={`Weather icon for ${weather}`} 
                                />
                            </h2>
                        </>
                    )}
                </div> 
            </ReactBootStrap.Card>
        </div>
    );
}

export default Home;
