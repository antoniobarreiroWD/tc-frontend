'use server'
import { redirect } from 'next/navigation'


export async function navigate(direction) {
    redirect(direction)
}



export const addFavouriteRestaurant = async (e) => {
    try {
        if(user) {
            await userService.likeRestaurant(id);
            setFavourite(true)
            clickLikeIcon(e.target)
        } else {
            navigate('/login')
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFavouriteRestaurant = async(e) => {
    try {
        if(user) {
            await userService.dislikeRestaurant(id);
            setFavourite(false)
            clickLikeIcon(e.target)
        } else {
            navigate('/login')
        }
    } catch (error) {
        console.log(error)
    }
}