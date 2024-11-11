'use client';
import RestaurantsGrid from '../components/RestaurantsGrid/RestaurantsGrid';
import { useAuthContext } from "../context/AuthContext";
import userService from '../services/user.service';
import { useEffect, useState } from 'react';

export default function AllRestaurants() {
    const { user } = useAuthContext();
    const [favouriteRestaurants, setFavouriteRestaurants] = useState([]);

    useEffect(() => {
        if (user) {
            getFavouriteRestaurants();
        }
    }, [user]);

    const getFavouriteRestaurants = async () => {
        try {
            const response = await userService.getFavouriteRestaurants();
            setFavouriteRestaurants(response);
        } catch (error) {
            console.error("Error fetching favorite restaurants:", error);
        }
    };

    return (
        <>
            {user && (
                <div className="profile-page px-5 lg:px-10 mb-14 text-black">
                    <div className="profile-header text-center mb-8">
                        <h1 className="text-2xl lg:text-4xl font-semibold">Bienvenido, {user.username}</h1>
                    </div>
                    
                    <div className="profile-card border rounded-3xl p-10 shadow-lg mb-8">
                        <h2 className="text-xl font-semibold mb-4">Información del perfil</h2>
                        <p><strong>Nombre de usuario:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>

                    {favouriteRestaurants.length > 0 && (
                        <div className="favourite-restaurants">
                            <h2 className="text-xl lg:text-2xl font-semibold text-center mb-6">Tus restaurantes favoritos</h2>
                            <RestaurantsGrid restaurants={favouriteRestaurants} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
