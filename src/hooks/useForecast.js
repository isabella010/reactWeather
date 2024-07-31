import { useState } from "react";
import axios from 'axios';

const useForecast = () => {
    const [isError, setError] = useState(null);
    const [forecast, setForecast] = useState(null);

    const submitRequest = async location => {
        try {
            const { data } = await axios(`https://api.openweathermap.org/data/2.5/find?q=${location}&units=metric&cnt=50&appid=97eaa9d3202c18880ca8bdc602e4905d`);
            
            if (!data || data.list.length === 0) {
                setError('No location found with this name.');
                setForecast(null);
                return;
            }
            
            setError(null);
            setForecast(data);
        } catch (error) {
            setError('An error occurred while fetching the data.');
        }
    };

    return {
        isError, 
        forecast,
        submitRequest,
    };
};

export default useForecast;
