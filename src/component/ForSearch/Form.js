import PropTypes from 'prop-types'
import React, {useState} from 'react'
import * as ReactBootStrap from "react-bootstrap"
import './Form.css';

const Form = ({submitSearch}) =>{
    const [location, setLocation] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();
        if (!location || location === '') return;
        submitSearch(location);
    }
    
    return(
        <>
        <div className="fakeJumbotron">
        <form onSubmit={onSubmit}>
            <input
                aria-label="location"
                type="text"
                placeholder="Enter City Name"
                required
                value={location}
                onChange={e => setLocation(e.target.value)} />

            <button type="submit" onClick={onSubmit}>
                SEARCH
            </button>
        </form>
        </div>
        </>
    );
}

Form.propTypes = {
    submitSearch: PropTypes.func.isRequired,
}

export default Form;