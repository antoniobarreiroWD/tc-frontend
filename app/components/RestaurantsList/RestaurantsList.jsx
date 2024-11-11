import './RestaurantsList.css';
import LikeIt from '../LikeIt/LikeIt';


export default function RestaurantsList({ restaurants, fnMouseEnter, fnMouseLeave, favouriteRestaurants, toggleFavouriteRestaurant }) {
    return (
        <ul className="restaurants-list">
            {restaurants.map((restaurant) => (
                <li
                    key={restaurant._id}
                    onMouseEnter={() => fnMouseEnter(restaurant._id)}
                    onMouseLeave={fnMouseLeave}
                    className={`restaurant-item ${favouriteRestaurants.includes(restaurant._id) ? 'bg-red-100' : ''}`}
                >
                    <div className="restaurant-details flex items-center gap-4">
                       
                        <img
                            src={restaurant.image || restaurant.photograph}
                            alt={restaurant.name}
                            className="restaurant-image w-20 h-20 object-cover rounded-lg"
                        />
                        
                       
                        <div className="restaurant-info">
                            <h3 className="restaurant-name font-semibold text-lg">{restaurant.name}</h3>
                            <p className="restaurant-address text-sm text-gray-600">{restaurant.address}</p>
                            <p className="restaurant-neighborhood text-sm text-gray-500">{restaurant.neighborhood}</p>
                        </div>

                       
                        <LikeIt
                            id={restaurant._id}
                            favouriteRestaurants={favouriteRestaurants}
                            toggleFavouriteRestaurant={toggleFavouriteRestaurant}
                            className="like-icon"
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}
