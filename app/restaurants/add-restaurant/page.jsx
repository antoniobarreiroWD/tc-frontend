'use client'
import CreateRestaurantForm from "../../components/CreateRestaurantForm/CreateRestaurantForm";
import { useState } from "react";
import restaurantService from '../../services/restaurants.service';

export default function CreateRestaurant() {
    const [error, setError] = useState(false);
    const [formSended, setFormSended] = useState(false);
    const [newRestaurantId, setNewRestaurantId] = useState(null);
    const [message, setMessage] = useState('');

    const initialData = {
        image: '',
        name: '',
        address: '',
        description: ''
    };

    const [restaurantData, setRestaurantData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurantData({ ...restaurantData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { image, name, address, description } = restaurantData;
        const data = { image, name, address, description };

        try {
            const response = await restaurantService.createRestaurant(data);
            if (response?._id) {
                setNewRestaurantId(response._id);
                setFormSended(true);
                setError(false);
                setMessage('Restaurante guardado con éxito');
            } else {
                throw new Error("El ID del restaurante no se encuentra en la respuesta");
            }
        } catch (err) {
            console.error("Error al crear el restaurante:", err);
            setFormSended(true);
            setError(true);
            setMessage('Ups, algo salió mal al guardar el restaurante');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
            {message && (
                <div className={`text-white p-4 rounded-md ${error ? 'bg-red-500' : 'bg-green-500'} text-center mb-4`}>
                    {message}
                </div>
            )}
            {!formSended ? (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="image" className="text-sm font-medium">URL de la imagen</label>
                        <input
                            type="text"
                            name="image"
                            value={restaurantData.image}
                            onChange={handleChange}
                            placeholder="Introduce la URL de la imagen"
                            className="p-2 border rounded-md"
                        />
                        {restaurantData.image && (
                            <img src={restaurantData.image} alt="Preview" className="mt-3 w-full h-auto rounded-md shadow-md" />
                        )}
                    </div>
                    <CreateRestaurantForm handleChange={handleChange} handleSubmit={handleSubmit} />
                </form>
            ) : (
                <div className="text-center space-y-4">
                    <p>{!error ? 'Restaurante guardado con éxito.' : 'Ups, algo salió mal.'}</p>
                    <a href={!error ? `/restaurants/${newRestaurantId}` : '/restaurants/add-restaurant'}
                       className="text-blue-500 hover:underline">
                        {!error ? 'Ver restaurante' : 'Intentar de nuevo'}
                    </a>
                </div>
            )}
        </div>
    );
}
