import './RestaurantsList.css';
import Link from 'next/link';
import LikeIt from '../LikeIt/LikeIt';
import { useState, useEffect } from 'react';
import RatingStars from '../RatingStars.js/RatingStars';

function RestaurantItem({ restaurant, fnMouseEnter, fnMouseLeave, favouriteRestaurants, toggleFavouriteRestaurant }) {
    const [imageSrc, setImageSrc] = useState(restaurant.image || restaurant.photograph || '/default-restaurant.jpg');

    useEffect(() => {
        if (restaurant.image || restaurant.photograph) {
            checkImage(restaurant.image || restaurant.photograph);
        }
    }, [restaurant.image, restaurant.photograph]);

    const checkImage = (url) => {
        const img = new Image();
        img.onload = () => setImageSrc(url);
        img.onerror = () => setImageSrc('/default-restaurant.jpg');
        img.src = url;
    };

    return (
        <li
            onMouseEnter={() => fnMouseEnter(restaurant._id)}
            onMouseLeave={fnMouseLeave}
            className="restaurant-item"
        >
            <div className="restaurant-details flex items-center gap-4">
                <Link href={`/restaurants/${restaurant._id}`} passHref>
                    <div className="restaurant-info-container cursor-pointer flex items-center gap-4">
                        <img
                            src={imageSrc}
                            alt={restaurant.name}
                            className="restaurant-image w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="restaurant-info">
                            <h3 className="restaurant-name font-semibold text-lg">{restaurant.name}</h3>
                            <p className="restaurant-address text-sm text-gray-600">{restaurant.address}</p>
                            <p className="restaurant-neighborhood text-sm text-gray-500">{restaurant.neighborhood}</p>
                            <RatingStars reviews={restaurant.reviews} />
                        </div>
                    </div>
                </Link>
                <LikeIt
                    id={restaurant._id}
                    favouriteRestaurants={favouriteRestaurants}
                    toggleFavouriteRestaurant={toggleFavouriteRestaurant}
                    className="like-icon"
                />
            </div>
        </li>
    );
}

export default function RestaurantsList({ restaurants, fnMouseEnter, fnMouseLeave, favouriteRestaurants, toggleFavouriteRestaurant }) {
    return (
        <ul className="restaurants-list">
            {restaurants.map((restaurant) => (
                <RestaurantItem
                    key={restaurant._id}
                    restaurant={restaurant}
                    fnMouseEnter={fnMouseEnter}
                    fnMouseLeave={fnMouseLeave}
                    favouriteRestaurants={favouriteRestaurants}
                    toggleFavouriteRestaurant={toggleFavouriteRestaurant}
                />
            ))}
        </ul>
    );
}
