import { create } from 'zustand';

// Simple ID generator for recipes (used when an id isn't provided)
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Compute filtered results based on a search term against title, description, ingredients, and steps
const computeFiltered = (recipes, term) => {
    const q = String(term || '').trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter((r) => {
        const haystack = [
            r?.title || '',
            r?.description || '',
            ...(Array.isArray(r?.ingredients) ? r.ingredients : []),
            ...(Array.isArray(r?.steps) ? r.steps : []),
        ]
            .join('\n')
            .toLowerCase();
        return haystack.includes(q);
    });
};

const useRecipeStore = create((set, get) => ({
    // State
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],

    // Replace all recipes
    setRecipes: (recipes) =>
        set((state) => {
            const term = state.searchTerm;
            return {
                recipes,
                filteredRecipes: computeFiltered(recipes, term),
            };
        }),

    // Create
    addRecipe: (newRecipe) =>
        set((state) => {
            const id = newRecipe?.id ?? generateId();
            const nextRecipes = [...state.recipes, { ...newRecipe, id }];
            return {
                recipes: nextRecipes,
                filteredRecipes: computeFiltered(nextRecipes, state.searchTerm),
            };
        }),

    // Update by id
    updateRecipe: (id, updates) =>
        set((state) => {
            const nextRecipes = state.recipes.map((r) => (r.id === id ? { ...r, ...updates, id: r.id } : r));
            return {
                recipes: nextRecipes,
                filteredRecipes: computeFiltered(nextRecipes, state.searchTerm),
            };
        }),

    // Delete by id
    deleteRecipe: (id) =>
        set((state) => {
            const nextRecipes = state.recipes.filter((r) => r.id !== id);
            return {
                recipes: nextRecipes,
                filteredRecipes: computeFiltered(nextRecipes, state.searchTerm),
            };
        }),

    // Search/filter actions
    setSearchTerm: (term) =>
        set(() => {
            const recipes = get().recipes;
            return {
                searchTerm: term,
                filteredRecipes: computeFiltered(recipes, term),
            };
        }),

    filterRecipes: () =>
        set((state) => ({
            filteredRecipes: computeFiltered(state.recipes, state.searchTerm),
        })),

    // Helper (non-reactive)
    getRecipeById: (id) => get().recipes.find((r) => r.id === id),
}));

export default useRecipeStore;