import { useState } from "react";
import axios from 'axios';

const useForecast = () =>{
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForcast] = useState(null);

    const submitRequest = async location => {
        const { data } = await axios(`https://api.openweathermap.org/data/2.5/find?callback?&q=` +location + `&units=metric&cnt=50&appid=97eaa9d3202c18880ca8bdc602e4905d`)

        if(!data || data.list.length === 0){
            setError('There is no location by this name')
            return;
        }

        setError(false);
        setForcast({data});
    }

    return{
        isError, 
        isLoading, 
        forecast,
        submitRequest,
    }
}
export default useForecast;




