'use client';
import RestaurantsGrid from '../../components/RestaurantsGrid/RestaurantsGrid';
import restaurantService from '../../services/restaurants.service';
import { useState, useEffect } from 'react';

export default function AllRestaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        try {
            const response = await restaurantService.getAllRestaurants();
            setRestaurants(response);
            setError(false);
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="px-5 py-10 lg:px-10">
            {error ? (
                <div className="bg-red-500 text-white p-4 rounded-md text-center">
                    Lo sentimos, ha habido un error al cargar los restaurantes.
                </div>
            ) : (
                restaurants && <RestaurantsGrid restaurants={restaurants} />
            )}
        </div>
    );
}
