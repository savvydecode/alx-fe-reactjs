
/* import {Link} from 'react-router-dom'
export default function AddRecipeForm() {

    const handleSubmit = () => {

    }


    return (<div>

        <Link to="/" className="text-blue-600 p-4 text-2xl font-bold hover:underline">
            ← Back
        </Link>
        <div className='max-w-2xl mx-auto p-4 sm:p-6'>
            <h1 className="text-2xl font-bold mb-4" >Add a New Recipe</h1>
            <form action="" onSubmit={handleSubmit}>
            <p>
                <label htmlFor="title">Recipe Title</label>
            </p>
            </form>
        </div>
        </div>);
}
 */

import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * AddRecipeForm (beginner-friendly)
 *
 * What it does:
 * - Shows a simple form to add a recipe: Title, Ingredients, Steps
 * - Validates that all fields are filled
 * - Validates that ingredients contain at least 2 items (one per line)
 * - On submit, it logs the recipe to the console and shows a success message
 *
 * Notes:
 * - Ingredients and Steps are entered one per line.
 * - Replace the console.log in handleSubmit with your API call or state update if needed.
 */
export default function AddRecipeForm() {
    // Form fields (controlled inputs)
    const [title, setTitle] = useState("");
    const [ingredientsText, setIngredientsText] = useState("");
    const [stepsText, setStepsText] = useState("");

    // UI state
    const [errors, setErrors] = useState({}); // { title?: string, ingredients?: string, steps?: string }
    const [success, setSuccess] = useState("");

    // Helper: convert textarea value into an array (one item per line)
    const linesFromText = (text) =>
        text
            .split(/\r?\n/) // split on new lines
            .map((s) => s.trim()) // trim spaces
            .filter((s) => s.length > 0); // remove empty lines

    // Validate fields before submit
    const validate = () => {
        const nextErrors = {};

        if (!title.trim()) {
            nextErrors.title = "Title is required.";
        } else if (title.trim().length < 3) {
            nextErrors.title = "Title must be at least 3 characters.";
        }

        const ing = linesFromText(ingredientsText);
        if (ing.length === 0) {
            nextErrors.ingredients = "Please add ingredients (one per line).";
        } else if (ing.length < 2) {
            nextErrors.ingredients = "Please add at least two ingredients.";
        }

        const steps = linesFromText(stepsText);
        if (steps.length === 0) {
            nextErrors.steps = "Please add at least one preparation step.";
        }

        setErrors(nextErrors);
        // If there are no keys in nextErrors, the form is valid
        return Object.keys(nextErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault(); // stop page reload
        setSuccess(""); // clear any old success message

        const isValid = validate();
        if (!isValid) return;

        // Build the recipe object
        const newRecipe = {
            id: crypto?.randomUUID?.() || String(Date.now()),
            title: title.trim(),
            ingredients: linesFromText(ingredientsText),
            instructions: linesFromText(stepsText),
        };

        // For now, just log and show success.
        // You can replace this with a fetch POST to your backend, or update app state.
        console.log("Recipe submitted:", newRecipe);

        // Reset form
        setTitle("");
        setIngredientsText("");
        setStepsText("");
        setErrors({});
        setSuccess("Recipe submitted successfully!");
    };

    return (
        <div>
            {/* Back link */}
            <Link to="/" className="text-blue-600 p-4 text-2xl font-bold hover:underline">
                ← Back
            </Link>

            {/* Container */}
            <div className="max-w-2xl mx-auto p-4 sm:p-6">
                <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-200">
                            Recipe Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Creamy Garlic Pasta"
                            className={[
                                "mt-1 w-full rounded-md border px-3 py-2 outline-none transition",
                                "bg-gray-900/60 text-gray-100 placeholder-gray-400",
                                "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40",
                            ].join(" ")}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                    </div>

                    {/* Ingredients */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-200">
                                Ingredients
                            </label>
                            <span className="text-xs text-gray-400">One per line</span>
                        </div>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            rows={6}
                            value={ingredientsText}
                            onChange={(e) => setIngredientsText(e.target.value)}
                            placeholder={"e.g.,\n200g spaghetti\n2 cloves garlic, minced\n1 tbsp olive oil"}
                            className={[
                                "mt-1 w-full rounded-md border px-3 py-2 outline-none transition resize-y",
                                "bg-gray-900/60 text-gray-100 placeholder-gray-400",
                                "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40",
                            ].join(" ")}
                        />
                        {errors.ingredients && <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>}
                    </div>

                    {/* Steps */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="steps" className="block text-sm font-medium text-gray-200">
                                Preparation Steps
                            </label>
                            <span className="text-xs text-gray-400">One per line</span>
                        </div>
                        <textarea
                            id="steps"
                            name="steps"
                            rows={8}
                            value={stepsText}
                            onChange={(e) => setStepsText(e.target.value)}
                            placeholder={"e.g.,\nBoil pasta in salted water.\nSauté garlic in olive oil.\nToss pasta with garlic and sauce."}
                            className={[
                                "mt-1 w-full rounded-md border px-3 py-2 outline-none transition resize-y",
                                "bg-gray-900/60 text-gray-100 placeholder-gray-400",
                                "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40",
                            ].join(" ")}
                        />
                        {errors.steps && <p className="mt-1 text-sm text-red-500">{errors.steps}</p>}
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-medium shadow-sm transition"
                        >
                            Submit Recipe
                        </button>
                        {success && <span className="text-sm text-green-500">{success}</span>}
                    </div>
                </form>

                {/* Small helper for mobile spacing */}
                <div className="h-2 sm:h-0" />
            </div>
        </div>
    );
}