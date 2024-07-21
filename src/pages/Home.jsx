import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FilterDropdown from '../components/FilterDropdown';
import ProductBox from '../components/ProductBox';

//store
import { fetchProductByArea } from '../store/reducer/productFilterSlice';

const Home = () => {
    const dispatch = useDispatch();

    const { products, status, error } = useSelector(
        (state) => state.productFilter
    );
    console.log(products);

    useEffect(() => {
        dispatch(fetchProductByArea('Indian'));
    }, [dispatch]);

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
            </div>
        </div>
    );
};

export default Home;
