import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
    //get the id passed through the route with useParams
    const { clientId } = useParams()
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    //use useEffect() to fetch the data
    useEffect(() => {
        //set loading to true whiles fetching data
        setLoading(true)
        setError(null)
        fetch('/data.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status} `);
                }
                return res.json();

            })

            .then(data => {
                // check if data is an array
                const arrayData = Array.isArray(data) ? data : null;

                // check if data is not array, throw an error
                if (!arrayData) {
                    throw new Error("Invalid data format: expected an array or an object with a 'recipes' array.");
                }


                // Check if the id recieved from route matches the any of the data fetched. 

                const matches = arrayData.find((r) => {
                    const matchId = r.id ?? r._id;
                    //return the 1st occurence of the data with same id as provided
                    return String(matchId) === String(clientId);
                })

                console.log(matches)
                setRecipes(matches)
                setLoading(false)
                setError(null)
            })
            .catch(err => {
                setLoading(false)
                setRecipes([])
                setError(err)
                console.log(error)
            })


    }, [clientId])

    // destructure data from the recipes to use in rendering:
    const { id, image, ingredients, instructions, summary, title } = recipes

    return (<>

        <Link to="/" className="text-blue-600 p-4 text-2xl font-bold hover:underline">
            ← Back
        </Link>

        {loading && <div className="p-2">Loading recipe...</div>}

        {error && <div>Failed to load recipe: {error}</div>}

        {!recipes && <div>Recipe Not Found!</div>}

        {recipes ?
            <div
                className={[
                    "flex flex-col justify-center rounded-4xl mt-6 shadow-2xl items-center",
                    "my-4  mx-auto max-w-4/5  lg:max-w-3/5 bg-blue-50"
                ].join(" ")}
                

            >
                <h1 className="font-bold text-4xl mb-4 text-blue-800" >{title}</h1>
                <div className="p-4 flex flex-col justify-center items-center g-2  bg-gradient-to-b from-blue-400 via-blue-400 to-blue-200 rounded-2xl sm:flex-row  max-w-full w-full">
                    <img className="w-60 mt-4 rounded-full  hover:shadow-2xl mr-2  md:w-70" src={image} alt={title} />
                    <div className="text-2xl max-w-md font-bold text-center text-blue-900">{summary}</div>

                </div>
                <div className="flex flex-col justify-center items-center" >
                    <div className="flex flex-col justify-center items-center ">
                        <h2 className="font-bold text-2xl mt-4">Ingredients</h2>
                        <ul>
                            {Array.isArray(ingredients) &&
                                ingredients.map(item => (
                                    <li key={item}
                                        className=" text-xl p-4 m-4 list-disc"
                                    >{item}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold text-2xl mt-4 ">Instructions</h2>
                        <ul>
                            {Array.isArray(instructions) &&
                                instructions.map(item => (
                                    <p key={item}
                                        className="text-xl p-4 m-4"
                                    >{item}</p>
                                ))
                            }
                        </ul>
                    </div>

                </div>
            </div>
            : ''
        }
    </>)
}



/* 
// Ensure public/data.json exists. Example shapes supported:
// - [{ id: 1, title: "...", ingredients: [], instructions: [], image: "..." }]
// - { recipes: [ ...same as above... ] }
export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                // Place data.json in the public/ folder and access it from root
                const res = await fetch("/data.json", { headers: { Accept: "application/json" } });
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text.slice(0, 200)}`);
                }

                const data = await res.json();

                // Support both array and { recipes: [] } formats
                const recipes = Array.isArray(data) ? data : Array.isArray(data?.recipes) ? data.recipes : null;
                if (!recipes) {
                    throw new Error("Invalid data format: expected an array or an object with a 'recipes' array.");
                }

                const match = recipes.find((r) => {
                    const rid = r.id ?? r._id ?? r.slug;
                    return String(rid) === String(id);
                });

                if (!cancelled) setRecipe(match || null);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return <div style={{ padding: 16 }}>Loading recipe...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: 16, color: "red" }}>
                Failed to load recipe: {error.message}
                <div style={{ marginTop: 8 }}>
                    <Link to="/" style={{ color: "#2563eb" }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div style={{ padding: 16 }}>
                Recipe not found.
                <div style={{ marginTop: 8 }}>
                    <Link to="/" style={{ color: "#2563eb" }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const { title, name, image, ingredients, instructions, steps, description } = recipe;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Link to="/" className="text-blue-600 hover:underline">
                ← Back
            </Link>

            <h1 className="text-2xl font-bold mt-2">{title || name || `Recipe ${id}`}</h1>

            {image && (
                <img
                    src={image}
                    alt={title || name || "Recipe image"}
                    className="w-full h-auto rounded my-4"
                />
            )}

            {description && <p className="mb-4">{description}</p>}

            {Array.isArray(ingredients) && ingredients.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                    <ul className="list-disc pl-6">
                        {ingredients.map((ing, idx) => {
                            if (typeof ing === "string") return <li key={idx}>{ing}</li>;
                            const qty = ing.quantity ? `${ing.quantity} ` : "";
                            const item = ing.item || ing.name || "";
                            return <li key={idx}>{`${qty}${item}`}</li>;
                        })}
                    </ul>
                </section>
            )}

            {(Array.isArray(instructions) || Array.isArray(steps)) && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                    <ol className="list-decimal pl-6">
                        {(instructions || steps).map((step, idx) => {
                            if (typeof step === "string") return <li key={idx} className="mb-2">{step}</li>;
                            return <li key={idx} className="mb-2">{step.text || JSON.stringify(step)}</li>;
                        })}
                    </ol>
                </section>
            )}
        </div>
    );
} */