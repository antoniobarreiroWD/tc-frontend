"use client";
import Button from "../../components/Button/Button";
import { useState, useEffect } from "react";
import restaurantService from "../../services/restaurants.service";
import { useAuthContext } from "../../context/AuthContext";
import CreateRestaurantForm from "../../components/CreateRestaurantForm/CreateRestaurantForm";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import { use } from "react";

export default function RestaurantDetails({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const [restaurant, setRestaurant] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [imageSrc, setImageSrc] = useState("/default-restaurant.jpg");

  const getRestaurant = async () => {
    try {
      const response = await restaurantService.getRestaurantById(params.restaurantId);
      setRestaurant(response);
      if (response.image) {
        checkImage(response.image);
      }
    } catch (error) {
      setMessage("Lo sentimos, no encontramos el restaurante que buscas");
    } finally {
      setIsLoading(false);
    }
  };

  const checkImage = (url) => {
    const img = new Image();
    img.onload = () => setImageSrc(url);
    img.onerror = () => setImageSrc("/default-restaurant.jpg");
    img.src = url;
  };

  useEffect(() => {
    if (params.restaurantId) {
      getRestaurant();
    }
  }, [params.restaurantId]);

  const deleteRestaurant = async () => {
    try {
      await restaurantService.deleteRestaurant(params.restaurantId);
      setMessage("El restaurante ha sido eliminado");
    } catch (error) {
      setMessage("No se pudo eliminar el restaurante");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedRestaurant = await restaurantService.editRestaurant(params.restaurantId, restaurant);
      setShowModal(false);
      setRestaurant(updatedRestaurant);
      setMessage("Restaurante actualizado con éxito");
    } catch (error) {
      setMessage("Error al actualizar el restaurante");
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="restaurant-details-page px-5 lg:px-10">
          {message && (
            <div className="p-4 rounded-md text-center mb-4 bg-green-500 text-white">
              {message}
            </div>
          )}

          <div className="w-5/6 mt-4 mx-auto">
            <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
            <p className="text-lg text-gray-700">{restaurant.neighborhood}</p>
            <p className="text-lg text-gray-700">{restaurant.address}</p>

            <div className="w-full max-w-lg mx-auto mt-4">
              <img
                src={imageSrc}
                alt={restaurant.name}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-semibold mt-6">Detalles</h2>
            <p className="text-md mb-4">
              <strong>Tipo de cocina:</strong> {restaurant.cuisine_type}
            </p>

            <h3 className="text-xl font-semibold mt-4">Horario de apertura</h3>
            <ul className="mb-4">
              {restaurant.operating_hours &&
                Object.entries(restaurant.operating_hours).map(([day, hours]) => (
                  <li key={day} className="text-md text-gray-600">
                    {day}: {hours}
                  </li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Reseñas</h3>
            {restaurant.reviews?.length > 0 ? (
              <ul className="reviews-list space-y-4">
                {restaurant.reviews.map((review, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-md">
                    <p className="font-semibold">
                      {review.name} <span className="text-sm text-gray-500">({review.date.split("T")[0]})</span>
                    </p>
                    <p className="text-sm text-yellow-500">Rating: {review.rating} / 5</p>
                    <p className="mt-2">{review.comments}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-md text-gray-500">No hay reseñas disponibles</p>
            )}

            {user && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowModal(true)}
                  className="bg-tailor-blue text-white px-4 py-2 rounded-md text-center w-full sm:w-auto"
                >
                  Editar Restaurante
                </Button>
                <Button
                  onClick={deleteRestaurant}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-center w-full sm:w-auto"
                >
                  Eliminar Restaurante
                </Button>
              </div>
            )}
          </div>

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <h2 className="text-2xl font-semibold text-center mb-6">Edita el restaurante</h2>
              <CreateRestaurantForm
                handleChange={handleChange}
                handleSubmit={handleSubmitEdit}
                data={restaurant}
              />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
