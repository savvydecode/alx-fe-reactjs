import { create } from 'zustand';

// Simple ID generator for recipes (used when an id isn't provided)
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const useRecipeStore = create((set, get) => ({
    // State
    recipes: [],

    // Replace all recipes
    setRecipes: (recipes) => set({ recipes }),

    // Create
    addRecipe: (newRecipe) =>
        set((state) => {
            const id = newRecipe?.id ?? generateId();
            return { recipes: [...state.recipes, { ...newRecipe, id }] };
        }),

    // Update by id
    updateRecipe: (id, updates) =>
        set((state) => ({
            recipes: state.recipes.map((r) => (r.id === id ? { ...r, ...updates, id: r.id } : r)),
        })),

    // Delete by id
    deleteRecipe: (id) =>
        set((state) => ({
            recipes: state.recipes.filter((r) => r.id !== id),
        })),

    // Helper (non-reactive)
    getRecipeById: (id) => get().recipes.find((r) => r.id === id),
}));

export default useRecipeStore;