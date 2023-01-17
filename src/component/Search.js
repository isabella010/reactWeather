import React, {Fragment, useState} from 'react';
import Form from './ForSearch/Form'
import useForecast from '../hooks/useForecast';
import Error from './ForSearch/Error'
import Forecast from './ForSearch/Forecast'

function SearchCity({handleSearch}){
    const {isError, isLoading, forecast, submitRequest} = useForecast();
    const onSubmit = (value) => {
        submitRequest(value);
    }

    const [EditId, setEditId] = useState(0);
    const handleForecast = (city) =>{
        setEditId(city);
        handleSearch(city);
        
    } 

    return(
        <Fragment>
            <div className='App'>
                {!isLoading && <Form submitSearch={onSubmit}/>}
                {isError && <Error message={isError}/>}
            </div>
            {forecast && <Forecast forecast={forecast} handleForecast={handleForecast}/>}
            
        </Fragment>
        
    );
}
export default SearchCity;

