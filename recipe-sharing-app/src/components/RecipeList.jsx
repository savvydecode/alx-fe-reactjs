import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
    const recipes = useRecipeStore((s) => s.recipes);
    const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
    const searchTerm = useRecipeStore((s) => s.searchTerm);

    const list = searchTerm ? filteredRecipes : recipes;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
            <h2>Recipes</h2>

            <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                {list.map((r) => (
                    <li key={r.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
                        <h3 style={{ margin: '0 0 6px' }}>
                            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                        </h3>
                        {r.description && <p style={{ margin: 0, color: '#555' }}>{r.description}</p>}
                    </li>
                ))}
                {list.length === 0 && (
                    <li style={{ color: '#666' }}>
                        {searchTerm ? 'No recipes match your search.' : 'No recipes yet.'}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default RecipeList;