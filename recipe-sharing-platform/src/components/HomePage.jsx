
import { useState, useEffect } from "react"

import data from '../data.json';
import Card, { CardContainer } from "./card";

function Homepage() {
    const [recipes, setRecipes] = useState([]);
    //setRecipes(jsonData)
    useEffect(() => {
        setRecipes(data)
    }, [recipes]);
    console.log(recipes)
    return (
        <CardContainer>
            {recipes.map(recipe => (
                <Card key={recipe.id} title={recipe.title} summary={recipe.summary} image={recipe.image}/>
                    
            ))}
        </CardContainer>
    );
}

export default Homepage;