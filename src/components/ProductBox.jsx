import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ProductPopup from './ProductPopup';
import { fetchSingleProduct } from '../store/reducer/productSlice';

const ProductBox = ({ data }) => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [productId, setProductId] = useState(null);

    const handleProductPopup = (id) => {
        setProductId(id);
        dispatch(fetchSingleProduct(id));
    };

    const handlePopup = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            <div
                className="cursor-pointer"
                onClick={() => {
                    handleProductPopup(data.idMeal);
                    handlePopup();
                }}
            >
                <div className="h-[183px] relative rounded-2xl overflow-hidden bg-black bg-opacity-5">
                    <img
                        src={data.strMealThumb}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        alt={data.strMeal}
                    />
                </div>
                <div className="pt-3 px-3">
                    <h4 className="text-lg leading-snug font-bold text-black">
                        {data.strMeal}
                    </h4>
                </div>
            </div>
            {openModal && (
                <ProductPopup
                    openModal={openModal}
                    handlePopup={handlePopup}
                    id={productId}
                />
            )}
        </>
    );
};

export default ProductBox;
