import { create } from 'zustand';

// Simple ID generator for recipes (used when an id isn't provided)
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Tokenize utility for recommendations (title, description, ingredients)
const tokenize = (text) =>
    String(text || '')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);

const recipeTokens = (recipe) => {
    const parts = [
        recipe?.title || '',
        recipe?.description || '',
        ...(Array.isArray(recipe?.ingredients) ? recipe.ingredients : []),
    ];
    return new Set(tokenize(parts.join(' ')));
};

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

// Compute recommendations based on favorites by token overlap
const computeRecommendations = (recipes, favorites) => {
    if (!Array.isArray(recipes) || recipes.length === 0) return [];
    const favSet = new Set(favorites || []);
    const favoriteRecipes = recipes.filter((r) => favSet.has(r.id));
    if (favoriteRecipes.length === 0) {
        // No favorites: suggest some recent or first few non-favorite recipes
        return recipes.slice(0, 5);
    }

    // Union of tokens from all favorite recipes
    const favTokens = new Set();
    favoriteRecipes.forEach((r) => {
        recipeTokens(r).forEach((t) => favTokens.add(t));
    });

    // Score non-favorite recipes by overlap with favorite tokens
    const scored = recipes
        .filter((r) => !favSet.has(r.id))
        .map((r) => {
            const tokens = recipeTokens(r);
            let overlap = 0;
            tokens.forEach((t) => {
                if (favTokens.has(t)) overlap += 1;
            });
            return { recipe: r, score: overlap };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.recipe)
        .slice(0, 5);

    // Fallback if nothing overlaps
    if (scored.length === 0) {
        return recipes.filter((r) => !favSet.has(r.id)).slice(0, 5);
    }
    return scored;
};

const useRecipeStore = create((set, get) => ({
    // State
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    favorites: [], // array of recipe ids
    recommendations: [], // array of recipe objects

    // Replace all recipes
    setRecipes: (recipes) =>
        set((state) => {
            const term = state.searchTerm;
            const nextFavorites = (state.favorites || []).filter((id) => recipes.some((r) => r.id === id));
            return {
                recipes,
                filteredRecipes: computeFiltered(recipes, term),
                favorites: nextFavorites,
                recommendations: computeRecommendations(recipes, nextFavorites),
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
                recommendations: computeRecommendations(nextRecipes, state.favorites),
            };
        }),

    // Update by id
    updateRecipe: (id, updates) =>
        set((state) => {
            const nextRecipes = state.recipes.map((r) => (r.id === id ? { ...r, ...updates, id: r.id } : r));
            return {
                recipes: nextRecipes,
                filteredRecipes: computeFiltered(nextRecipes, state.searchTerm),
                recommendations: computeRecommendations(nextRecipes, state.favorites),
            };
        }),

    // Delete by id
    deleteRecipe: (id) =>
        set((state) => {
            const nextRecipes = state.recipes.filter((r) => r.id !== id);
            const nextFavorites = state.favorites.filter((fid) => fid !== id);
            return {
                recipes: nextRecipes,
                filteredRecipes: computeFiltered(nextRecipes, state.searchTerm),
                favorites: nextFavorites,
                recommendations: computeRecommendations(nextRecipes, nextFavorites),
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

    // Favorites actions
    addFavorite: (recipeId) =>
        set((state) => {
            if (state.favorites.includes(recipeId)) return {};
            const nextFavorites = [...state.favorites, recipeId];
            return {
                favorites: nextFavorites,
                recommendations: computeRecommendations(state.recipes, nextFavorites),
            };
        }),

    removeFavorite: (recipeId) =>
        set((state) => {
            const nextFavorites = state.favorites.filter((id) => id !== recipeId);
            return {
                favorites: nextFavorites,
                recommendations: computeRecommendations(state.recipes, nextFavorites),
            };
        }),

    toggleFavorite: (recipeId) =>
        set((state) => {
            const isFav = state.favorites.includes(recipeId);
            const nextFavorites = isFav
                ? state.favorites.filter((id) => id !== recipeId)
                : [...state.favorites, recipeId];
            return {
                favorites: nextFavorites,
                recommendations: computeRecommendations(state.recipes, nextFavorites),
            };
        }),

    // Recompute recommendations on demand
    generateRecommendations: () =>
        set((state) => ({
            recommendations: computeRecommendations(state.recipes, state.favorites),
        })),

    // Helpers (non-reactive)
    getRecipeById: (id) => get().recipes.find((r) => r.id === id),
}));

export default useRecipeStore;