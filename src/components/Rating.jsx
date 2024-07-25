import React from 'react';
import Icon from '../inc/Icon';

const Rating = ({ totalStars }) => {
    console.log(totalStars);
    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
                <span key={index}>
                    <Icon
                        name="star-icon"
                        size={16}
                        className={`${
                            index < totalStars
                                ? 'text-orange-500'
                                : 'text-gray-300'
                        }`}
                    />
                </span>
            ))}
        </div>
    );
};

export default Rating;
