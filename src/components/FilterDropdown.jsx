import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//store
import { fetchCategories } from '../store/reducer/categoriesSlice';
import { fetchProductsByCategories } from '../store/reducer/productFilterSlice';

//component
import Loader from './Loader';
import Icon from '../inc/Icon';
import FilterPopup from './FilterPopup';

const FilterDropdown = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);

    const [selectedCategories, setselectedCategories] = useState('');

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, status]);

    const isArray = Array.isArray(categories);

    const handlePopup = () => {
        setOpenModal(!openModal);
    };
    const handleApply = () => {
        dispatch(fetchProductsByCategories(selectedCategories));
    };

    return (
        <>
            {status === 'loading' ? (
                <div className="text-center">
                    <Loader />
                </div>
            ) : status === 'failed' ? (
                <p>Error: {error}</p>
            ) : (
                <ul className="flex flex-wrap gap-2">
                    <li>
                        <button
                            type="button"
                            className="text-sm font-medium leading-normal inline-flex items-center gap-x-1 border border-black border-opacity-30 py-2 px-3 rounded-full text-gray text-opacity-75 shadow-[0_2px_12px_rgba(2,6,12,0.04)] cursor-pointer transition-all duration-300 ease-in-out"
                            onClick={handlePopup}
                        >
                            Filter <Icon name="filter-icon" size="16" />
                        </button>
                    </li>
                    {isArray ? (
                        categories.map((item, index) => (
                            <li key={index}>
                                <input
                                    id={`category-${index}`}
                                    type="radio"
                                    name="category"
                                    value={item.strCategory}
                                    className="hidden peer"
                                    onChange={(e) =>
                                        setselectedCategories(e.target.value)
                                    }
                                    onClick={handleApply}
                                />
                                <label
                                    htmlFor={`category-${index}`}
                                    className="text-sm font-medium leading-normal inline-flex items-center gap-x-1 border border-black border-opacity-30 py-2 px-3 rounded-full text-gray text-opacity-75 shadow-[0_2px_12px_rgba(2,6,12,0.04)] cursor-pointer transition-all duration-300 ease-in-out peer-checked:bg-grey-100 peer-checked:border-black [&>svg]:hidden peer-checked:[&>svg]:block"
                                >
                                    {item.strCategory}{' '}
                                    <Icon
                                        name="close-icon"
                                        size="16"
                                        className=""
                                    />
                                </label>
                            </li>
                        ))
                    ) : (
                        <p>No categories available.</p>
                    )}
                </ul>
            )}
            <FilterPopup openModal={openModal} handlePopup={handlePopup} />
        </>
    );
};

export default FilterDropdown;
