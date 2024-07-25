import React from 'react';
import ReactPaginate from 'react-paginate';

import Icon from '../inc/Icon';

const Pagination = ({ total, handleClick, currentPage }) => {
    return (
        <>
            <ReactPaginate
                previousLabel={<Icon name="chevron-left-icon" size="20" />}
                nextLabel={<Icon name="chevron-right-icon" size="20" />}
                breakLabel={'...'}
                pageCount={total}
                pageRangeDisplayed={5}
                onPageChange={handleClick}
                containerClassName={
                    'flex flex-wrap justify-center items-center gap-x-2'
                }
                pageClassName={'w-8 h-8 grid place-items-center'}
                pageLinkClassName={
                    'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                }
                previousClassName={
                    'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-100 hover:text-white'
                }
                nextClassName={
                    'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-100 hover:text-white'
                }
                previousLinkClassName={
                    'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                }
                activeClassName={'active'}
                activeLinkClassName={
                    '!bg-black bg-opacity-100 text-white rounded-lg'
                }
                disabledClassName={'pointer-events-none'}
                disabledLinkClassName={'pointer-events-none'}
                initialPage={currentPage - 1}
            />
        </>
    );
};

export default Pagination;
