import React from 'react';
import PropTypes from 'prop-types';

const Error = ({message}) =>(
    <div role="alert">
        {message}
    </div>
);

Error.propTypes = {
    message: PropTypes.string,
};

Error.defaultProps = {
    message: 'An error occured',
};
export default Error;