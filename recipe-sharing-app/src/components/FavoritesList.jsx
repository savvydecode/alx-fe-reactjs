import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton.jsx';

const FavoritesList = () => {
    const favorites = useRecipeStore((s) => s.favorites);
    const recipes = useRecipeStore((s) => s.recipes);

    const favoriteRecipes = favorites
        .map((id) => recipes.find((r) => r.id === id))
        .filter(Boolean);

    return (
        <section style={{ marginTop: 24 }}>
            <h2>My Favorites</h2>
            {favoriteRecipes.length === 0 ? (
                <p className="muted">You haven’t favorited any recipes yet.</p>
            ) : (
                <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                    {favoriteRecipes.map((r) => (
                        <li key={r.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 6px' }}>
                                    <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                                </h3>
                                {r.description && <p style={{ margin: 0, color: '#555' }}>{r.description}</p>}
                            </div>
                            <FavoriteButton recipeId={r.id} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default FavoritesList;