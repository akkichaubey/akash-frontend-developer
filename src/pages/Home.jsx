import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import FilterDropdown from '../components/FilterDropdown';
import ProductBox from '../components/ProductBox';

// Store
import {
    fetchProductByArea,
    fetchProductsByCategories,
    setCurrentPage,
} from '../store/reducer/productFilterSlice';
import Pagination from '../components/Pagination';

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
    }, [dispatch, currentCategory, isArea, currentPage]);

    const handlePageClick = (num) => {
        dispatch(setCurrentPage(num.selected + 1));
    };

    return (
        <div className="py-12">
            <div className="container">
                <h1 className="pb-4">
                    {status === 'loading' ? (
                        <Skeleton count={1} />
                    ) : (
                        'Restaurants with online food delivery in Ahmedabad'
                    )}
                </h1>
                <FilterDropdown />
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
                        <Pagination
                            total={Math.ceil(totalProducts / 12)}
                            handleClick={handlePageClick}
                            currentPage={currentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
