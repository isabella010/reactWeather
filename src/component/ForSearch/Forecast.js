import React, { useState, Fragment } from 'react';
import './Forecast.css';
import PropTypes from 'prop-types';
import ForecastMain from './ForecastMain';
import ForecastMore from './ForecastMore';
import Pagination from './Pagination';

const Forecast = ({ forecast, handleForecast }) => {
    const [editId, setEditId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3; // fixed to be a constant

    console.log(forecast);

    const handleClick = (event, city) => {
        event.preventDefault();
        setEditId(city.id);
        handleForecast(city);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = forecast.data.list.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <table className="mainTable" align="center">
                    <tbody>
                        {currentPosts.map((city) => (
                            <Fragment key={city.id}>
                                {editId === city.id ? (
                                    <ForecastMore city={city} />
                                ) : (
                                    <ForecastMain city={city} handleClick={handleClick} />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
                <Pagination 
                    postsPerPage={postsPerPage} 
                    totalPosts={forecast.data.list.length} 
                    paginate={paginate} 
                />
            </div>
        </>
    );
};

Forecast.propTypes = {
    forecast: PropTypes.shape({
        data: PropTypes.object.isRequired,
    }).isRequired,
};

export default Forecast;
