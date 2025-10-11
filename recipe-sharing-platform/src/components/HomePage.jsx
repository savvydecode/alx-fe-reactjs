
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import data from '../data.json';


//component to render and style each recipe card
//the components below can be in a seperate file
export function Card({ id, key, text, summary, image }) {
    const navigate = useNavigate()
    const getDetails = () => {
        if (id !== undefined && id !== null) {
            navigate(`/recipe/${id}`)
        }
    }
    return (

        <div id={key}
            className="flex flex-row justify-center items-center  mx-auto my-2 border p-2 bg bg-gradient-to-r from-blue-900 via-blue-800 via-blue-700 to-blue-600 rounded-2xl max-w-sm sm:max-w-sm  sm:justify-center lg:max-w-lg gap-2  sm:gap-1
        ">
            <img onClick={getDetails}
                className="w-40 rounded-full hover:shadow-2xl"
                src={image} alt={text} />
            <div
                className="flex flex-col justify-center items-center"
            >
                <h2 className="font-bold text-lg">{text}</h2>
                <p>{summary}</p>
            </div>

        </div>

    );
}

//component to stye the cards container
export function CardContainer({ children }) {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center mx-auto sm:flex-row sm:gap-2 p-2    sm:justify-between text-white
            "
        >{children}</div>
    )
}




export default function Homepage() {
    const [recipes, setRecipes] = useState([]);
    //setRecipes(jsonData)

    /* useEffect(() => {
        setRecipes(data)
    }, [recipes]);
    console.log(recipes) */

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/data.json')
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text.slice(0, 200)}`);
                }
                const data = await res.json()
                setRecipes(data)
            } catch(error){
                console.error(error)
            }
        }
        fetchData()

    })
    return (
        <CardContainer>
            {recipes.map(recipe => (
                <Card key={recipe.id} id={recipe.id} text={recipe.title} summary={recipe.summary} image={recipe.image} />

            ))}
        </CardContainer>
    );
}
