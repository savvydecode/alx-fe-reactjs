import React from 'react';
import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
    const isFavorite = useRecipeStore((s) => s.favorites.includes(recipeId));
    const addFavorite = useRecipeStore((s) => s.addFavorite);
    const removeFavorite = useRecipeStore((s) => s.removeFavorite);

    const onClick = () => {
        if (isFavorite) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };

    return (
        <button
            onClick={onClick}
            aria-pressed={isFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            style={{
                padding: '6px 10px',
                borderRadius: 6,
                border: '1px solid #e5e7eb',
                background: isFavorite ? '#fff3f3' : '#f7f7f7',
                color: isFavorite ? '#e53935' : '#333',
            }}
        >
            {isFavorite ? '★ Favorited' : '☆ Favorite'}
        </button>
    );
};

export default FavoriteButton;