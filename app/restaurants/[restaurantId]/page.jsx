"use client";

import Button from "../../components/Button/Button";
import { useState, useEffect } from "react";
import restaurantService from "../../services/restaurants.service";
import { useAuthContext } from "../../context/AuthContext";
import CreateRestaurantForm from "../../components/CreateRestaurantForm/CreateRestaurantForm";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import { InteractiveStarRating } from "../../components/InteractiveStarRating/InteractiveStarRating";
import StarIcon from "../../components/Icons/StarIcon/StarIcon";
import { use } from "react";

export default function RestaurantDetails({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { restaurantId } = params;

  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const [restaurant, setRestaurant] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [imageSrc, setImageSrc] = useState("/default-restaurant.jpg");

  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 0,
    comments: "",
  });

  const getRestaurant = async () => {
    try {
      const response = await restaurantService.getRestaurantById(restaurantId);
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
    if (restaurantId) {
      getRestaurant();
    }
  }, [restaurantId]);

  const deleteRestaurant = async () => {
    try {
      await restaurantService.deleteRestaurant(restaurantId);
      setMessage("El restaurante ha sido eliminado");
    } catch (error) {
      setMessage("No se pudo eliminar el restaurante");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value) => {
    setReviewData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage("Debes iniciar sesión para dejar una reseña");
      return;
    }

    try {
      const newReview = {
        name: reviewData.name || user.name,
        date: new Date().toISOString(),
        rating: reviewData.rating,
        comments: reviewData.comments,
      };

      const updatedReviews = [...(restaurant.reviews || []), newReview];

      const updatedRestaurant = await restaurantService.editRestaurant(
        restaurantId,
        {
          ...restaurant,
          reviews: updatedReviews,
        }
      );

      setRestaurant(updatedRestaurant);
      setReviewData({ name: "", rating: 0, comments: "" });
      setMessage("Reseña agregada con éxito");
    } catch (error) {
      setMessage("Error al agregar la reseña");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedRestaurant = await restaurantService.editRestaurant(
        restaurantId,
        restaurant
      );
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

            <div className="w-full max-w-3xl mx-auto mt-4">
              <img
                src={imageSrc}
                alt={restaurant.name}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-semibold mt-6">Detalles</h2>
            <p className="text-md mb-4">
              <strong>Tipo de cocina:</strong> {restaurant.cuisine_type}
            </p>

            <h3 className="text-xl font-semibold mt-4">Horario de apertura</h3>
            <ul className="mb-4">
              {restaurant.operating_hours &&
                Object.entries(restaurant.operating_hours).map(
                  ([day, hours]) => (
                    <li key={day} className="text-md text-gray-600">
                      {day}: {hours}
                    </li>
                  )
                )}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Reseñas</h3>

            {restaurant.reviews?.length > 0 ? (
              <ul className="reviews-list space-y-4">
                {restaurant.reviews.map((review, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-md">
                    <p className="font-semibold">
                      {review.name}{" "}
                      <span className="text-sm text-gray-500">
                        ({review.date.split("T")[0]})
                      </span>
                    </p>
                    <div className="flex">
                     
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          fillClass={
                            i < review.rating
                              ? "fill-tailor-blue"
                              : "fill-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-2">{review.comments}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-md text-gray-500">
                No hay reseñas disponibles
              </p>
            )}

            {user && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">
                  Escribe una reseña
                </h4>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={reviewData.name}
                      onChange={handleReviewChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Introduce tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Calificación
                    </label>
                    <InteractiveStarRating
                      rating={reviewData.rating}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Comentario
                    </label>
                    <textarea
                      name="comments"
                      value={reviewData.comments}
                      onChange={handleReviewChange}
                      rows="4"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Escribe tu reseña aquí..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-white text-black border border-black px-4 py-2 rounded-md w-full sm:w-auto"
                  >
                    Enviar Reseña
                  </Button>
                </form>
              </div>
            )}

            {user && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowModal(true)}
                  className="bg-white text-black border border-black px-4 py-2 rounded-md w-full sm:w-auto"
                >
                  Editar Restaurante
                </Button>
                <Button
                  onClick={deleteRestaurant}
                  className="bg-white text-black border border-black px-4 py-2 rounded-md w-full sm:w-auto"
                >
                  Eliminar Restaurante
                </Button>
              </div>
            )}
          </div>

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="modal-content max-w-lg md:max-w-2xl lg:max-w-3xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">
                  Edita el restaurante
                </h2>
                <CreateRestaurantForm
                  handleChange={handleChange}
                  handleSubmit={handleSubmitEdit}
                  data={restaurant}
                />
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
