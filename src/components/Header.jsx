import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//component
import Icon from '../inc/Icon';
import Logo from './Logo';

const Header = () => {
    const [searchToggle, setSearchToggle] = useState(false);
    const handleSearchToggle = () => {
        setSearchToggle((prevToggle) => !prevToggle);
    };
    return (
        <>
            <div className="h-20 sm:h-14 transition-all duration-300 ease-in-out">
                <header className="header bg-white relative shadow-md">
                    <div className="container flex items-center gap-x-6 justify-between">
                        <div className="logo">
                            <Logo color="text-primary" />
                        </div>
                        <div className="h-20 sm:h-14 flex items-center transition-all duration-300 ease-in-out">
                            <button
                                aria-label="Handle search toggle"
                                className="w-8 h-8 grid place-items-center min-sm:hidden"
                                onClick={handleSearchToggle}
                            >
                                <Icon name="search-icon" size="16" />
                            </button>
                            <div
                                className={`absolute top-full left-0 right-0 w-full transition-all duration-300 ease-in-out min-sm:static sm:bg-white sm:px-4 sm:py-3 sm:shadow-md ${
                                    searchToggle
                                        ? 'opacity-100 sm:translate-y-0'
                                        : 'sm:translate-y-4 sm:opacity-0'
                                }`}
                            >
                                <form>
                                    <div className="flex items-center bg-black bg-opacity-5 px-3 rounded-md">
                                        <input
                                            type="text"
                                            placeholder="Search for restaurants and food"
                                            className="w-full bg-transparent text-base sm:text-sm sm:leading-none leading-none p-2 outline-none placeholder:text-black placeholder:text-opacity-50"
                                        />
                                        <button
                                            aria-label="Search icon"
                                            className="w-6 h-6 grid place-items-center text-black text-opacity-60"
                                        >
                                            <Icon
                                                name="search-icon"
                                                size="16"
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;
