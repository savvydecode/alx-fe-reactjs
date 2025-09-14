import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton.jsx';

const RecommendationsList = () => {
    const recommendations = useRecipeStore((s) => s.recommendations);
    const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

    return (
        <section style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ margin: 0 }}>Recommended for You</h2>
                <button onClick={generateRecommendations} style={{ padding: '4px 8px' }} title="Refresh recommendations">
                    Refresh
                </button>
            </div>
            {recommendations.length === 0 ? (
                <p className="muted">No recommendations yet. Add some favorites to get personalized suggestions.</p>
            ) : (
                <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                    {recommendations.map((r) => (
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

export default RecommendationsList;