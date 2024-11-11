'use client'
import Button from '../../components/Button/Button';
import HeroRestaurant from '../../components/HeroRestaurant/HeroRestaurant';
import { useState, useEffect } from 'react';
import restaurantService from '../../services/restaurants.service';
import { useAuthContext } from '../../context/AuthContext';
import CreateRestaurantForm from '../../components/CreateRestaurantForm/CreateRestaurantForm';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';

export default function RestaurantDetails({ params }) {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext();
    const [restaurant, setRestaurant] = useState({});
    const [formSended, setFormSended] = useState(false);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editRestaurantData, setEditRestaurantData] = useState({});
    const [message, setMessage] = useState('');

    const getRestaurant = async () => {
        try {
            const response = await restaurantService.getRestaurantById(params.restaurantId);
            setRestaurant(response);
            setEditRestaurantData(response);
            setNotFound(false);
        } catch (error) {
            setNotFound(true);
            setMessage('Lo sentimos, no encontramos el restaurante que buscas');
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        if (params.restaurantId) {
            getRestaurant();
        }
    }, [params.restaurantId, formSended, showModal]);

    const deleteRestaurant = async () => {
        try {
            await restaurantService.deleteRestaurant(params.restaurantId);
            setFormSended(true);
            setError(false);
            setMessage('El restaurante ha sido eliminado');
        } catch (error) {
            setFormSended(true);
            setError(true);
            setMessage('Ups, algo salió mal al eliminar el restaurante');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditRestaurantData({ ...editRestaurantData, [name]: value });
    };
    
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const updatedRestaurant = await restaurantService.editRestaurant(params.restaurantId, editRestaurantData);
            setShowModal(false);
            setRestaurant(updatedRestaurant);
            setMessage('Restaurante actualizado con éxito');
        } catch (error) {
            console.log(error);
            setMessage('Error al actualizar el restaurante');
        }
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {notFound && (
                        <div className="bg-red-500 text-white p-4 rounded-md text-center mb-4">
                            {message}
                        </div>
                    )}
                    
                    {!notFound && !formSended && (
                        <div className="px-5 lg:px-10">
                            {message && (
                                <div className={`p-4 rounded-md text-center mb-4 ${error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                    {message}
                                </div>
                            )}
                            <HeroRestaurant restaurant={restaurant} />
                            <div className="w-5/6 mt-10 mx-auto">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                                    <div className="lg:w-2/3">
                                        {restaurant.description 
                                            ? <p>{restaurant.description}</p>
                                            : <p>Lorem ipsum dolor sit amet consectetur...</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <Button onClick={deleteRestaurant} className="mt-4 bg-red-500 text-white">
                                Eliminar Restaurante
                            </Button>
                        </div>
                    )}

                    {formSended && (
                        <div className={`p-4 rounded-md text-center mb-4 ${error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                            {message}
                        </div>
                    )}

                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <h2 className="text-2xl font-semibold text-center mb-6">Edita el restaurante</h2>
                            <CreateRestaurantForm 
                                handleChange={handleChange} 
                                handleSubmit={handleSubmitEdit}
                                data={editRestaurantData} 
                            />
                        </Modal>
                    )}
                </>
            )}
        </>
    );
}
