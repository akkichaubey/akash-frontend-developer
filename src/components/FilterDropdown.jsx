import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

//store
import { fetchCategories } from '../store/reducer/categoriesSlice';
import {
    fetchProductsByCategories,
    fetchProductByArea,
    setCurrentCategory,
    setCurrentPage,
    setIsArea,
    setSortOrder, // Import setSortOrder action
} from '../store/reducer/productFilterSlice';
//component
import Icon from '../inc/Icon';
import FilterPopup from './FilterPopup';

const FilterDropdown = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);

    const currentPage = useSelector((state) => state.productFilter.currentPage);

    const [selectedCategories, setSelectedCategories] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (selectedCategories) {
            if (selectedCategories === 'Indian') {
                dispatch(setIsArea(true));
                dispatch(
                    fetchProductByArea({
                        area: selectedCategories,
                        page: currentPage,
                    })
                );
            } else {
                dispatch(setIsArea(false));
                dispatch(
                    fetchProductsByCategories({
                        category: selectedCategories,
                        page: currentPage,
                    })
                );
            }
        }
    }, [dispatch, selectedCategories, currentPage]);

    const isArray = Array.isArray(categories);

    const handlePopup = () => {
        setOpenModal(!openModal);
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        dispatch(setCurrentCategory(selectedCategory));
        dispatch(setCurrentPage(1));
        if (selectedCategory === 'Indian') {
            dispatch(setIsArea(true));
            dispatch(fetchProductByArea({ area: selectedCategory, page: 1 }));
        } else {
            dispatch(setIsArea(false));
            dispatch(
                fetchProductsByCategories({
                    category: selectedCategory,
                    page: 1,
                })
            );
        }
    };
    const handleSortOrderChange = (order) => {
        dispatch(setSortOrder(order));
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            {status === 'loading' ? (
                <div className="text-center">
                    <Skeleton count={1} height={43} />
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
                    <li>
                        <button
                            className="text-sm font-medium leading-normal inline-flex items-center gap-x-1 border border-black border-opacity-30 py-2 px-3 rounded-full text-gray text-opacity-75 shadow-[0_2px_12px_rgba(2,6,12,0.04)] cursor-pointer transition-all duration-300 ease-in-out"
                            type="button"
                            onClick={toggleDropdown}
                        >
                            Sort By
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div
                                id="dropdown"
                                className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownDefaultButton"
                                >
                                    <li>
                                        <button
                                            type="button"
                                            className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={() => {
                                                handleSortOrderChange('asc');
                                                toggleDropdown();
                                            }}
                                        >
                                            Ace
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={() => {
                                                handleSortOrderChange('desc');
                                                toggleDropdown();
                                            }}
                                        >
                                            Dec
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
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
                                    onChange={handleCategoryChange}
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
