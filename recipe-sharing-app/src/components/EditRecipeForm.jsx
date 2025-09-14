import React, { useEffect, useMemo, useState } from 'react';
import useRecipeStore from './recipeStore';

const toText = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
const toArray = (text) =>
    String(text || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

const EditRecipeForm = ({ recipe }) => {
    const updateRecipe = useRecipeStore((s) => s.updateRecipe);

    const initial = useMemo(
        () => ({
            title: recipe?.title ?? '',
            description: recipe?.description ?? '',
            ingredientsText: toText(recipe?.ingredients ?? []),
            stepsText: toText(recipe?.steps ?? []),
        }),
        [recipe]
    );

    const [form, setForm] = useState(initial);

    // Sync local state when recipe prop changes
    useEffect(() => {
        setForm(initial);
    }, [initial]);

    if (!recipe) return null;

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updateRecipe(recipe.id, {
            title: form.title.trim(),
            description: form.description.trim(),
            ingredients: toArray(form.ingredientsText),
            steps: toArray(form.stepsText),
        });
    };

    return (
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
            <label>
                Title
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    required
                    placeholder="Recipe title"
                    style={{ width: '100%', padding: 8 }}
                />
            </label>

            <label>
                Description
                <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    rows={3}
                    placeholder="Short description"
                    style={{ width: '100%', padding: 8 }}
                />
            </label>

            <label>
                Ingredients (one per line)
                <textarea
                    name="ingredientsText"
                    value={form.ingredientsText}
                    onChange={onChange}
                    rows={6}
                    placeholder="Ingredient 1&#10;Ingredient 2"
                    style={{ width: '100%', padding: 8 }}
                />
            </label>

            <label>
                Steps (one per line)
                <textarea
                    name="stepsText"
                    value={form.stepsText}
                    onChange={onChange}
                    rows={6}
                    placeholder="Step 1&#10;Step 2"
                    style={{ width: '100%', padding: 8 }}
                />
            </label>

            <button type="submit" style={{ padding: '8px 12px' }}>
                Save Changes
            </button>
        </form>
    );
};

export default EditRecipeForm;