import React from "react";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md" | "lg";
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviews, size = "md" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const reviewSize = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className="flex items-center">
      <div className={`flex text-yellow-400 ${starSize[size]}`}>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
      {reviews !== undefined && (
        <span className={`text-text-secondary ml-1 ${reviewSize[size]}`}>
          ({reviews})
        </span>
      )}
    </div>
  );
};

export default StarRating;
