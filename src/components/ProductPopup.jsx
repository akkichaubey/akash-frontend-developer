import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '../inc/Icon';
import Loader from './Loader';
const ProductPopup = ({ openModal, handlePopup, id }) => {
    const { product, status, error } = useSelector((state) => state.product);
    console.log(product);

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
                    <div className="text-center">
                        <Loader />
                    </div>
                ) : status === 'failed' ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="flex flex-wrap h-full px-5">
                        <div className="w-4/12 py-5 border-r border-black border-opacity-10 h-full overflow-auto no-scrollbar"></div>
                        <div className="w-2/3 py-5 pl-5 h-full overflow-auto no-scrollbar">
                            <h3 className="h3 text-black text-opacity-80">
                                {product.strMeal}
                            </h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPopup;
