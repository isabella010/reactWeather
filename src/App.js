import './App.css';
import * as ReactBootStrap from "react-bootstrap"
import Home from './component/Home'
import SearchCity from './component/Search'
import RecentCity from './component/RecentCity'
import React, { setState, useState }from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1); // update the state to force render
}

function App() {
  const forceUpdate = useForceUpdate();
  const [recentlyViewed, setRecentlyViewed] = useState([]); 
  const [searchId, setSearchId] = useState(0);
  
  const handleSearch = (city) =>{ 
    if(city != null){
      recentlyViewed.push(city);
    } 
  } 

  return (
    <div className="App"> 
      <Router>
        <div className="App">
          <ReactBootStrap.Navbar collapseOnSelect expand="sm" bg="warning" variant="dark">
          <ReactBootStrap.Nav.Link > </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Navbar.Brand href="/">Home</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav"> 
              <ReactBootStrap.Nav className="me-auto">
                <ReactBootStrap.Nav.Link href="/search">Search</ReactBootStrap.Nav.Link>
                <ReactBootStrap.NavDropdown title="Recently Viewed" id="collasible-nav-dropdown" onClick={forceUpdate} >
                    {                   
                      recentlyViewed.map((list, index) => (  
                        <ReactBootStrap.NavDropdown.Item href={'/recent/'+recentlyViewed[index].id+'/'+recentlyViewed[index].name+'/'+recentlyViewed[index].sys.country+'/'+recentlyViewed[index].main.temp+'/'+recentlyViewed[index].weather[0].main+'/'+recentlyViewed[index].weather[0].icon} key={list.id}>{recentlyViewed[index].name}, {recentlyViewed[index].sys.country}</ReactBootStrap.NavDropdown.Item>
                      ))
                    }
                </ReactBootStrap.NavDropdown>


              </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
          </ReactBootStrap.Navbar> 
        </div>  
          {}
          <Routes>
            <Route path='/search'element={<SearchCity handleSearch={handleSearch}/>}/>
            <Route path='/recent/:id/:city/:country/:temp/:weather/:icon' element={<RecentCity recentlyViewed/>} />
            <Route path='/'element={<Home/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App; 
