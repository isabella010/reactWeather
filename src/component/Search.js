import React from 'react';
import Form from './ForSearch/Form';
import useForecast from '../hooks/useForecast';
import Error from './ForSearch/Error';
import Forecast from './ForSearch/Forecast';

function SearchCity({ handleSearch }) {
    const { isError, isLoading, forecast, submitRequest } = useForecast();

    const onSubmit = (value) => {
        submitRequest(value);
    }

    const handleForecast = (city) => {
        handleSearch(city);
    }

    return (
        <>
            <div className='App'>
                {!isLoading && <Form submitSearch={onSubmit} />}
                {isError && <Error message={isError} />}
            </div>
            {forecast && <Forecast forecast={forecast} handleForecast={handleForecast} />}
        </>
    );
}

export default SearchCity;
