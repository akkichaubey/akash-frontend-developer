import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Store
import { fetchAreas } from '../store/reducer/areaSlice';
import {
    fetchProductByArea,
    setCurrentPage,
    setCurrentCategory,
    setIsArea,
} from '../store/reducer/productFilterSlice';

// Components
import Loader from './Loader';
import Icon from '../inc/Icon';

const FilterPopup = ({ openModal, handlePopup }) => {
    const dispatch = useDispatch();
    const { areas, error, status } = useSelector((state) => state.area);

    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAreas());
        }
    }, [dispatch, status]);

    const handleApply = () => {
        dispatch(setIsArea(true));
        dispatch(setCurrentCategory(selectedArea));
        dispatch(setCurrentPage(1));
        dispatch(fetchProductByArea({ area: selectedArea, page: 1 }));
    };

    const handleClearFilters = () => {
        setSelectedArea('Indian');
        dispatch(setIsArea(false));
        dispatch(setCurrentCategory('Indian'));
        dispatch(setCurrentPage(1));
        dispatch(fetchProductByArea({ area: 'Indian', page: 1 }));
    };

    const isArray = Array.isArray(areas);
    // console.log(areas);
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
            {status === 'loading' ? (
                <div className="text-center">
                    <Loader />
                </div>
            ) : status === 'failed' ? (
                <p>Error: {error}</p>
            ) : (
                <div
                    className={`w-full h-[60%] max-w-[1050px] bg-white relative pt-[68px] pb-[64px] rounded-2xl max-h-[calc(100%-80px)] transition-all duration-300 ease-in-out ${
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
                            Filter
                        </h3>
                    </div>
                    <div className="flex flex-wrap h-full px-5">
                        <div className="w-1/3 pt-5 border-r border-black border-opacity-10 h-full overflow-auto no-scrollbar">
                            <ul className="flex flex-col">
                                <li>
                                    <button
                                        type="button"
                                        className="py-3 px-3 relative text-lg font-semibold text-grey text-opacity-75"
                                    >
                                        Filter By Area
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="w-2/3 pt-5 pl-5 h-full overflow-auto no-scrollbar">
                            {isArray ? (
                                <>
                                    <ul className="flex flex-wrap flex-col gap-2">
                                        {areas.map((item, index) => (
                                            <li key={index}>
                                                <input
                                                    id={`area-${index}`}
                                                    type="radio"
                                                    name="area"
                                                    value={item.strArea}
                                                    className="peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(e) =>
                                                        setSelectedArea(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`area-${index}`}
                                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    {item.strArea}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex gap-x-3 justify-end py-3 px-5 shadow-[0_-2px_5px_rgba(40,44,63,0.1)] absolute left-0 right-0 bottom-0">
                                        <button
                                            type="button"
                                            className="text-base leading-none font-semibold py-3 px-5 transition-all duration-300 ease-in-out"
                                            onClick={handleClearFilters}
                                        >
                                            Clear Filters
                                        </button>
                                        <button
                                            type="button"
                                            className="text-base leading-none font-semibold py-3 px-5 transition-all duration-300 ease-in-out bg-primary text-white rounded-full hover:bg-black"
                                            onClick={() => {
                                                handleApply();
                                                handlePopup();
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p>No areas available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPopup;
