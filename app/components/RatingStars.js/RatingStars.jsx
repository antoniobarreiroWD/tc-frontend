import React from 'react';
import StarIcon from '../Icons/StarIcon/StarIcon';

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round(totalRating / reviews.length); 
};

const RatingStars = ({ reviews }) => {
  const averageRating = calculateAverageRating(reviews);

  return (
    <div className="rating-stars flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} fill={i < averageRating ? 'tailor-blue' : 'gray-300'} />
      ))}
    </div>
  );
};

export default RatingStars;
