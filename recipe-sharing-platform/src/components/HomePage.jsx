
import { useState, useEffect } from "react"

import data from '../data.json';


//component to render and style each recipe card
//the components below can be in a seperate file
export function Card({ key, text, summary, image }) {
    return (

        <div id={key} 
        className="flex flex-row justify-center items-center  mx-auto my-2 border p-2 bg bg-gradient-to-r from-blue-900 via-blue-800 via-blue-700 to-blue-600 rounded-2xl max-w-sm sm:max-w-sm  sm:justify-center lg:max-w-lg  sm:gap-1
        ">
            <img
                className="w-40 rounded-full hover:shadow-2xl"
                src={image} alt={text} />
            <div 
            className="flex flex-col"
            >
                <h2>{text}</h2>
                <p>{summary}</p>
            </div>

        </div>

    );
}

//component to stye the cards container
export function CardContainer({ children }) {
    return (
        <div
            className="flex flex-col justify-center items-center mx-auto sm:flex-row sm:gap-2 p-2    sm:justify-between
            "
        >{children}</div>
    )
}




export default function Homepage() {
    const [recipes, setRecipes] = useState([]);
    //setRecipes(jsonData)
    useEffect(() => {
        setRecipes(data)
    }, [recipes]);
    console.log(recipes)
    return (
        <CardContainer>
            {recipes.map(recipe => (
                <Card key={recipe.id} text={recipe.title} summary={recipe.summary} image={recipe.image}/>
                    
            ))}
        </CardContainer>
    );
}
