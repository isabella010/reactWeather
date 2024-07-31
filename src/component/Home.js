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
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchLocalWeather = async () => {
        try {
            await window.navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    setLatitude(lat);
                    setLongitude(lon);

                    const res = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=97eaa9d3202c18880ca8bdc602e4905d`
                    );

                    setTemp(res.data.main.temp); 
                    setCity(res.data.name); 
                    setIcon(res.data.weather[0].icon);
                    setWeather(res.data.weather[0].main);
                    setCountryID(res.data.sys.country.toLowerCase());

                    const currentdate = new Date(); 
                    const tempdate = `${currentdate.getMonth() + 1}/${currentdate.getDate()}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes() < 10 ? '0' + currentdate.getMinutes() : currentdate.getMinutes()}`;
                    
                    setDatetime(tempdate);
                    setIsDataLoaded(true);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="app">
            <ReactBootStrap.Card body className="card">
                <button onClick={fetchLocalWeather}>Get Weather</button>
                {isDataLoaded && (
                    <div className="userLocation"> 
                    <br>
                        <h1> {city} 
                            <img 
                                src={`http://openweathermap.org/images/flags/${countryID}.png`} 
                                alt={`${countryID} flag`} 
                            />
                        </h1>
                        <h2> {datetime}</h2>
                        <h2> {temp} °C</h2>
                        <h2> {weather} 
                            <img 
                                src={`http://openweathermap.org/img/wn/${icon}.png`} 
                                alt={`Weather icon for ${weather}`} 
                            />
                        </h2> 
                        <br>
                    </div>
                )}
            </ReactBootStrap.Card>
        </div>
    );
}

export default Home;
