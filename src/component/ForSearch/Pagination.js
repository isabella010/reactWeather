import React from 'react';
import './page.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="nav">
            {pageNumbers.map(number => (
                <div key={number} className="page-item">
                    <button 
                        onClick={() => paginate(number)} 
                        className="page-link" 
                        aria-label={`Go to page ${number}`}
                    >
                        {number}
                    </button>
                </div>
            ))}
        </nav>
    );
};

export default Pagination;
