import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap"
import axios from "axios"
import './Home.css';

function Home(){
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('');
  const [datetime, setDatetime] = useState('');
  const [countryID, setCountryID] = useState('');
  const [icon, setIcon] = useState('');

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(latitude +" "+ longitude);
  }

  const fetchLocalWeather = async () => {
    try{
      await window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=` +latitude + `&lon=` + longitude+ `&units=metric&appid=97eaa9d3202c18880ca8bdc602e4905d`
      );
      console.log(res);
      setTemp(res.data.main.temp); 
      setCity(res.data.name); 
      setIcon(res.data.weather[0].icon);
      setWeather(res.data.weather[0].main)
      var tempFlag = res.data.sys.country;
      tempFlag = tempFlag.toLowerCase();
      setCountryID(tempFlag);

      var currentdate = new Date(); 
      var tempdate = (currentdate.getMonth()+1) + "/" + currentdate.getDate()  + "/" 
      + currentdate.getFullYear() + " @ "  
      + currentdate.getHours() + ":"  
        if(currentdate.getMinutes() < 10){
          tempdate+= "0" + currentdate.getMinutes()
        }else{
          tempdate+= currentdate.getMinutes()
        }
    
      setDatetime (tempdate);

    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    fetchLocalWeather();
  }, [latitude, longitude])

  return (
    <div className="app">
    <ReactBootStrap.Card body className="card">
       <div className="userLocation"> 
          <h1>{city} <img src={'http://openweathermap.org/images/flags/'+countryID+'.png'}></img></h1>
          <h2>{datetime}</h2>
          <h2>{temp} °C</h2>
          <h2>{weather} <img src={'http://openweathermap.org/img/wn/'+icon+'.png'}></img></h2> 
       </div> 
       </ReactBootStrap.Card>
    </div>
  );
}
export default Home;