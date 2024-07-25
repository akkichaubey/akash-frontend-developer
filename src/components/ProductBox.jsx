import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import ProductPopup from './ProductPopup';
import { fetchSingleProduct } from '../store/reducer/productSlice';
import Rating from './Rating';

const ProductBox = ({ data }) => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState(0);

    useEffect(() => {
        const randomStars = Math.floor(Math.random() * 5) + 1;
        setStars(randomStars);
    }, []);

    const product = useSelector(
        (state) => state.product.singleProduct?.[data.idMeal]
    );

    useEffect(() => {
        if (!product) {
            setLoading(true);
            dispatch(fetchSingleProduct(data.idMeal))
                .unwrap()
                .then(() => {
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [dispatch, data.idMeal, product]);

    const handleProductPopup = (id) => {
        setOpenModal(true);
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
                    {loading ? (
                        <Skeleton height={183} />
                    ) : (
                        <>
                            <img
                                src={data.strMealThumb}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                alt={data.strMeal}
                            />
                            <h3 className="absolute top-0 left-0 right-0 bottom-0 z-0 px-4 pb-2 text-xl leading-snug font-extrabold flex items-end text-white uppercase bg-gradient-to-t from-black from-4% to-white-0 to-96% ">
                                40% OFF UPTO ₹80
                            </h3>
                        </>
                    )}
                </div>
                <div className="pt-3 px-3">
                    {loading ? (
                        <Skeleton width={150} height={24} />
                    ) : (
                        <h4 className="text-lg leading-snug font-bold text-black">
                            {data.strMeal}
                        </h4>
                    )}
                    {loading ? (
                        <Skeleton width={150} height={12} />
                    ) : (
                        <Rating totalStars={stars} />
                    )}
                </div>
            </div>
            {openModal && (
                <ProductPopup
                    openModal={openModal}
                    handlePopup={handlePopup}
                    id={data.idMeal}
                />
            )}
        </>
    );
};

export default ProductBox;
