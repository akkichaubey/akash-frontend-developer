import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import FilterDropdown from '../components/FilterDropdown';
import ProductBox from '../components/ProductBox';

//store
import {
    fetchProductByArea,
    fetchProductsByCategories,
    setCurrentPage,
} from '../store/reducer/productFilterSlice';
import Icon from '../inc/Icon';

const Home = () => {
    const dispatch = useDispatch();

    const {
        products,
        totalProducts,
        currentPage,
        currentCategory,
        isArea,
        status,
        error,
    } = useSelector((state) => state.productFilter);

    useEffect(() => {
        if (isArea) {
            dispatch(
                fetchProductByArea({
                    area: currentCategory,
                    page: currentPage,
                })
            );
        } else {
            dispatch(
                fetchProductsByCategories({
                    category: currentCategory,
                    page: currentPage,
                })
            );
        }
    }, [dispatch, currentPage, currentCategory, isArea]);

    const handlePageClick = (data) => {
        dispatch(setCurrentPage(data.selected + 1));
    };

    return (
        <div className="py-12">
            <div className="container">
                <h2 className="h3 text-black pb-4">
                    Restaurants with online food delivery in Ahmedabad
                </h2>
                <FilterDropdown />
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && products.length > 0 ? (
                    <div className="flex flex-wrap -mx-[15px] pt-9">
                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="w-1/4 md:w-1/3 sm:w-1/2 xs:w-full px-[15px] h-full pb-[30px]"
                            >
                                <ProductBox data={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    status === 'succeeded' && <p>No products available.</p>
                )}
                {status === 'succeeded' && products.length > 0 && (
                    <div className="pt-5">
                        <ReactPaginate
                            previousLabel={
                                <Icon name="chevron-left-icon" size="16" />
                            }
                            nextLabel={
                                <Icon name="chevron-right-icon" size="16" />
                            }
                            breakLabel={'...'}
                            pageCount={Math.ceil(totalProducts / 12)}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={
                                'flex flex-wrap justify-center items-center gap-x-2'
                            }
                            pageClassName={'w-8 h-8 grid place-items-center'}
                            pageLinkClassName={
                                'bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                            }
                            previousClassName={
                                'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                            }
                            nextClassName={
                                'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                            }
                            activeClassName={'active'}
                            activeLinkClassName={
                                'bg-black text-white rounded-lg'
                            }
                            disabledClassName={'pointer-events-none'}
                            disabledLinkClassName={'pointer-events-none'}
                        />
                        {/* <ReactPaginate
                            previousLabel={
                                <Icon name="chevron-left-icon" size="16" />
                            }
                            nextLabel={
                                <Icon name="chevron-right-icon" size="16" />
                            }
                            renderOnZeroPageCountrenderOnZeroPageCount={null}
                            s
                            breakLabel={'...'}
                            pageCount={Math.ceil(totalProducts / 12)}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={
                                'flex flex-wrap justify-center items-center gap-x-2'
                            }
                            pageLinkClassName={
                                'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                            }
                            nextClassName={
                                'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                            }
                            previousLinkClassName={
                                'w-8 h-8 grid place-items-center bg-black bg-opacity-15 rounded-lg hover:bg-opacity-25'
                            }
                            // activeClassName={'bg-black text-white rounded-lg'}
                            disabledClassName={'pointer-events-none'}
                            disabledLinkClassName={'pointer-events-none'}
                        /> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
