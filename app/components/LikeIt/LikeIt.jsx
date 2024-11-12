import { useEffect, useState } from "react";
import LikeIcon from "../Icons/LikeIcon/LikeIcon";
import './LikeIt.css';

export default function LikeIt({ className, id, favouriteRestaurants, toggleFavouriteRestaurant }) {
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(favouriteRestaurants.includes(id));
    }, [favouriteRestaurants, id]);

    const handleClick = (e) => {
        e.stopPropagation(); 
        toggleFavouriteRestaurant(id);
    };

    return (
        <div
            className={`cursor-pointer w-[34px] h-[34px] ${className} z-50 ${isFavourite ? 'text-red-500' : ''}`}
            onClick={handleClick}
        >
            <LikeIcon like={isFavourite} />
        </div>
    );
}
