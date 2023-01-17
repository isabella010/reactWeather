import React, {useState} from 'react'
import * as ReactBootStrap from "react-bootstrap"
import { useLocation,useNavigate,useParams } from "react-router-dom";
import './Home.css';

  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
 
    return ComponentWithRouterProp;
  }

function RecentCity(props) {
  var tempFlag = props.router.params.country.toLowerCase();
  var icon = props.router.params.icon;
  console.log("props is ", props);

  return (
    <div className="app">
      <ReactBootStrap.Card body className="card">
   <div className="userLocation"> 
        <h1>{props.router.params.city}, {props.router.params.country} <img src={'http://openweathermap.org/images/flags/'+tempFlag+'.png'}></img></h1>
        <h2>Temp: {props.router.params.temp} °C </h2>
        <h2>{props.router.params.weather} <img src={'http://openweathermap.org/img/wn/'+icon+'.png'}></img></h2>
        </div> 
   </ReactBootStrap.Card>
    </div>
  )
}
export default withRouter(RecentCity);