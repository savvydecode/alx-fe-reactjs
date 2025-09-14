import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm.jsx';
import DeleteRecipeButton from './DeleteRecipeButton.jsx';
import FavoriteButton from './FavoriteButton.jsx';

const RecipeDetails = () => {
    const { id } = useParams();
    const recipe = useRecipeStore((state) => state.recipes.find((r) => r.id === id));

    if (!recipe) {
        return (
            <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
                <h2>Recipe not found</h2>
                <Link to="/">Back to recipes</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
            <Link to="/">← Back to recipes</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <h1 style={{ margin: 0 }}>{recipe.title}</h1>
                <FavoriteButton recipeId={recipe.id} />
            </div>
            <p>{recipe.description}</p>

            <div style={{ display: 'flex', gap: 24, marginTop: 24, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients?.map((ing, idx) => (
                            <li key={idx}>{ing}</li>
                        ))}
                    </ul>

                    <h3>Steps</h3>
                    <ol>
                        {recipe.steps?.map((step, idx) => (
                            <li key={idx}>{step}</li>
                        ))}
                    </ol>
                </div>

                <div style={{ flex: 1 }}>
                    <h3>Edit Recipe</h3>
                    <EditRecipeForm recipe={recipe} />
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <DeleteRecipeButton recipeId={recipe.id} />
                        <FavoriteButton recipeId={recipe.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;