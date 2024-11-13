'use client';

import { useState } from "react";
import CreateRestaurantForm from "../../components/CreateRestaurantForm/CreateRestaurantForm";
import restaurantService from '../../services/restaurants.service';

export default function CreateRestaurant() {
    const [error, setError] = useState(false);
    const [formSended, setFormSended] = useState(false);
    const [newRestaurantId, setNewRestaurantId] = useState(null);
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const initialData = {
        image: '',
        name: '',
        address: '',
        description: '',
        cuisine_type: '',
        neighborhood: '',
    };

    const [restaurantData, setRestaurantData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurantData({ ...restaurantData, [name]: value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file)); 
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

            setUploading(true);
            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: "POST",
                    body: formData
                });
                const data = await response.json();
                setRestaurantData({ ...restaurantData, image: data.secure_url });
                setUploading(false);
            } catch (err) {
                console.error("Error al subir la imagen:", err);
                setUploading(false);
            }
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setRestaurantData({ ...restaurantData, image: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { image, name, address, description, cuisine_type, neighborhood } = restaurantData;
        const data = { image, name, address, description, cuisine_type, neighborhood };

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
            setMessage('No se ha podido guardar el restaurante');
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
                        <label htmlFor="image" className="text-sm font-medium">Imagen del Restaurante</label>
                        <div className="relative w-full max-w-2xl h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                            {previewImage ? (
                                <>
                                    <img src={previewImage} alt="Vista previa" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center hover:bg-opacity-75"
                                    >
                                        Eliminar imagen
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <span className="text-gray-400">Haz clic para subir una imagen</span>
                                </>
                            )}
                        </div>
                        {uploading && <p>Cargando imagen...</p>}
                    </div>
                    <CreateRestaurantForm handleChange={handleChange} handleSubmit={handleSubmit} />
                </form>
            ) : (
                <div className="text-center space-y-4">
                    <p>{!error ? 'Restaurante guardado con éxito.' : 'Algo ha salido mal.'}</p>
                    <a href={!error ? `/restaurants/${newRestaurantId}` : '/restaurants/add-restaurant'}
                       className="text-blue-500 hover:underline">
                        {!error ? 'Ver restaurante' : 'Intentar de nuevo'}
                    </a>
                </div>
            )}
        </div>
    );
}
