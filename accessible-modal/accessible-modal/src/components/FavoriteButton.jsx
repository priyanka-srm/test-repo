import { useState } from "react";

function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleToggle() {
    setIsFavorite((current) => !current);
  }

  return (
    <button
      type="button"
      className="favorite-button"
      onClick={handleToggle}
      aria-label={
        isFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      aria-pressed={isFavorite}
    >
      <span aria-hidden="true">
        {isFavorite ? "★" : "☆"}
      </span>
    </button>
  );
}

export default FavoriteButton;