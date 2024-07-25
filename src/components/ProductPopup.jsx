import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Icon from '../inc/Icon';
import Loader from './Loader';
import Rating from './Rating';

const ProductPopup = ({ openModal, handlePopup, id }) => {
    const { product, status, error } = useSelector((state) => state.product);
    const [stars, setStars] = useState(0);

    useEffect(() => {
        const randomStars = Math.floor(Math.random() * 5) + 1;
        setStars(randomStars);
    }, []);

    return (
        <div
            className={`fixed flex items-center justify-center top-0 left-0 w-full h-full z-50 bg-black bg-opacity-75 transition-all duration-300 ease-in-out ${
                openModal ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
            <div
                className="fixed top-0 left-0 w-full h-full"
                onClick={handlePopup}
            ></div>
            <div
                className={`w-full h-[60%] max-w-[1050px] bg-white relative pt-[68px] rounded-2xl max-h-[calc(100%-80px)] transition-all duration-300 ease-in-out ${
                    openModal ? 'translate-y-0' : 'translate-y-5'
                }`}
            >
                <div className="pt-5 absolute top-0 left-0 right-0">
                    <button
                        type="button"
                        className="grid place-items-center absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow-md"
                        onClick={handlePopup}
                    >
                        <Icon name="close-icon" size="20" />
                    </button>
                    <h3 className="h3 py-2 px-5 border-b border-black border-opacity-10">
                        Product Single
                    </h3>
                </div>
                {status === 'loading' ? (
                    <div className="flex flex-wrap h-full px-5">
                        <div className="w-4/12 py-5 pr-5 border-r border-black border-opacity-10 h-full overflow-auto no-scrollbar">
                            <Skeleton height={300} />
                        </div>
                        <div className="w-2/3 py-5 pl-5 h-full overflow-auto no-scrollbar">
                            <Skeleton width={200} height={24} />
                            <div className="pt-3">
                                <Skeleton count={3} />
                            </div>
                        </div>
                    </div>
                ) : status === 'failed' ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="flex flex-wrap h-full px-5">
                        <div className="w-4/12 py-5 pr-5 border-r border-black border-opacity-10 h-full overflow-auto no-scrollbar">
                            <div className="img-cover">
                                <img
                                    src={product.strMealThumb}
                                    alt={product.strMeal}
                                />
                            </div>
                        </div>
                        <div className="w-2/3 py-5 pl-5 h-full overflow-auto no-scrollbar">
                            <h3 className="h3 text-black text-opacity-80">
                                {product.strMeal}
                            </h3>
                            <Rating rating={stars} />
                            <div className="pt-3">
                                <p>{product.strInstructions}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPopup;
