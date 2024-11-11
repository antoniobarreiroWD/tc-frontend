'use client';
import userService from '../../services/user.service';
import RestaurantMap from '../RestaurantMap/RestaurantMap';
import RestaurantsList from '../RestaurantsList/RestaurantsList';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { navigate } from '../../utils/Index';
import Spinner from '../Spinner/Spinner';

export default function RestaurantsGrid({ restaurants }) {
    const [isLoading, setIsLoading] = useState(true);
    const { user, getProfile } = useAuthContext();
    const [centerCoords, setCenterCoords] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

    const selectRestaurant = (restaurantId) => {
        const restaurant = restaurants.find((restaurant) => restaurant._id === restaurantId);
        if (restaurant && restaurant.latlng) {
            setCenterCoords(restaurant.latlng);
            setSelectedRestaurant(restaurantId);
        }
    };

    const unselectRestaurant = () => setSelectedRestaurant(null);

    const getFavoriteRestaurants = () => {
        if (user) {
            setFavoriteRestaurants(user.favoriteRestaurants || []);
        }
    };

    useEffect(() => {
        getFavoriteRestaurants(); 
        if (restaurants) setIsLoading(false);
    }, [user]); 

    const toggleFavouriteRestaurant = async (id) => {
        try {
            if (user) {
                let updatedFavourites;
                if (favoriteRestaurants.includes(id)) {
                    await userService.dislikeRestaurant(id);
                    updatedFavourites = favoriteRestaurants.filter((restaurant) => restaurant !== id);
                } else {
                    await userService.likeRestaurant(id);
                    updatedFavourites = [...favoriteRestaurants, id];
                }
                setFavoriteRestaurants(updatedFavourites); 
                await getProfile(); 
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {restaurants.length === 0 ? (
                        <p>No hay ningún restaurante añadido.</p>
                    ) : (
                        <div className="flex flex-col items-center lg:items-stretch lg:flex-row lg:h-[calc(100vh-200px)] px-5 lg:px-10 gap-5 lg:gap-10">
                            <div className='w-full lg:w-1/2 h-auto'>
                                <div className='h-[250px] lg:h-full bg-tailor-gray overflow-hidden rounded-3xl'>
                                    <RestaurantMap restaurants={restaurants} selectedRestaurant={selectedRestaurant} center={centerCoords} />
                                </div>
                            </div>
                            <div className={`restaurants__list lg:w-1/2 overflow-auto lg:mb-[-70px] ${selectedRestaurant ? 'hovered' : ''}`}>
                                <RestaurantsList
                                    restaurants={restaurants}
                                    fnMouseEnter={selectRestaurant}
                                    fnMouseLeave={unselectRestaurant}
                                    favouriteRestaurants={favoriteRestaurants}
                                    toggleFavouriteRestaurant={toggleFavouriteRestaurant}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
