import React, { useState } from 'react';
import axios from "axios"

const ForecastMore = ({city}) =>{
    const [sunset, setSunset] = useState(0);
    const [sunrise, setSunrise] = useState(0);
    const [finalSet, setFinalSet] = useState(0);
    const [finalRise, setFinalRise] = useState(0);

    var currentdate = new Date(); 
    var tempdate = (currentdate.getMonth()+1) + "/" + currentdate.getDate()  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  
    if(currentdate.getMinutes() < 10){
        tempdate+= "0" + currentdate.getMinutes()
    }else{
        tempdate+= currentdate.getMinutes()
    }
    
    const fetchLocalWeather = async () => {
        try{
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=` + city.id + `&units=metric` + `&appid=97eaa9d3202c18880ca8bdc602e4905d`
          );
          console.log(res);
          setSunset(res.data.sys.sunset);
          setSunrise(res.data.sys.sunrise);
          var rise = (sunrise*1000);
          let rdate = new Date(rise);
          setFinalRise(rdate.toLocaleTimeString())
          var set = (sunset*1000);
          let sdate = new Date(set);
          setFinalSet(sdate.toLocaleTimeString())

        }catch(err){
          console.error(err);
        }
      }
      fetchLocalWeather();

    return(
        <tr align="center" className="tableRow">
            <td className="tableD">
            <hr className="horizontal"/>
            <img src={'http://openweathermap.org/images/flags/'+city.sys.country.toLowerCase()+'.png'}></img> {city.name}, {city.sys.country}  
            <br/>
            Current Temperature: {city.main.temp}°C, {city.weather[0].main} <img src={'http://openweathermap.org/img/wn/'+city.weather[0].icon+'@2x.png'}></img>
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
}
export default ForecastMore;