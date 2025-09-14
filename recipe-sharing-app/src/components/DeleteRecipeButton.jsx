import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
    const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
    const navigate = useNavigate();

    const handleDelete = () => {
        const ok = window.confirm('Are you sure you want to delete this recipe?');
        if (!ok) return;
        deleteRecipe(recipeId);
        navigate('/');
    };

    return (
        <button
            onClick={handleDelete}
            style={{ background: '#e53935', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}
        >
            Delete Recipe
        </button>
    );
};

export default DeleteRecipeButton;