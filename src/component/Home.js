import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import './Home.css';

function Home() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState('');
    const [datetime, setDatetime] = useState('');
    const [countryID, setCountryID] = useState('');
    const [icon, setIcon] = useState('');
    const [showWeather, setShowWeather] = useState(false); // State to manage visibility

    const savePositionToState = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    const fetchLocalWeather = async () => {
        try {
            // Ensure geolocation is supported and request permission
            if (navigator.geolocation) {
                await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            savePositionToState(position);
                            resolve();
                        },
                        (error) => reject(error)
                    );
                });

                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=97eaa9d3202c18880ca8bdc602e4905d`
                );
                console.log(res);
                setTemp(res.data.main.temp);
                setCity(res.data.name);
                setIcon(res.data.weather[0].icon);
                setWeather(res.data.weather[0].main);
                setCountryID(res.data.sys.country.toLowerCase());

                var currentdate = new Date();
                var tempdate = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + (currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes());

                setDatetime(tempdate);
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="app">
            <ReactBootStrap.Card body className="card">
                <div className="userLocation">
                    <button onClick={() => { 
                        fetchLocalWeather();
                        setShowWeather(true); // Show weather info after button click
                    }}>
                        Get Weather
                    </button>
                    {showWeather && (
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
