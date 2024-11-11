import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import CustomMarker from '../CustomMarker/CustomMarker';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID

export default function RestaurantMap ({restaurants, selectedRestaurant, center}) {
    const preloadPosition = {"lat":40.713829,"lng":-73.989667}
    let [initialPosition, setInitialPosition] = useState(preloadPosition);
    let [currentPosition, setCurrentPosition] = useState(preloadPosition);
    const [restaurantSelected, setRestaurantSelected] = useState(null);

    useEffect(() => {
        if(restaurants && restaurants.length !== 0 ) {
            setInitialPosition(restaurants[0].latlng)
            
            if(center) {
                setCurrentPosition(center)
                setRestaurantSelected(selectedRestaurant)
            } else {
                setCurrentPosition(initialPosition)
            }
        }
    }, [restaurants, center, selectedRestaurant]);

    return (
        <>
            { restaurants ? (
                    <APIProvider apiKey={apiKey}>
                    <Map defaultCenter={ initialPosition } center={currentPosition} defaultZoom={14} mapId={mapId}>
                        {
                            restaurants.map((restaurant, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <AdvancedMarker position={restaurant.latlng} >
                                            <CustomMarker id={`restaurant-${index}`} fill={ restaurantSelected === restaurant._id ? 'tailor-blue' : 'tailor-purple'} />
                                        </AdvancedMarker>
                                    </React.Fragment>
                                )
                            })
                        }
                    </Map>
                </APIProvider>  
            ) : (
                <p>Cargando el mapa...</p>
            )}
        </>
    )
}