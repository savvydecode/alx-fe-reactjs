// AddRecipeForm component
import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
    const addRecipe = useRecipeStore((state) => state.addRecipe);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const canSubmit = title.trim().length > 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!canSubmit) return;

        addRecipe({
            title: title.trim(),
            description: description.trim(),
            ingredients: [],
            steps: [],
        });

        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                style={{ padding: 8 }}
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                rows={3}
                style={{ padding: 8 }}
            />
            <button type="submit" disabled={!canSubmit} style={{ padding: '8px 12px' }}>
                Add Recipe
            </button>
        </form>
    );
};

export default AddRecipeForm;