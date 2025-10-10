
//component to render and style each recipe card
export default function Card({ key, title, summary, image }) {
    return (

        <div id={key} 
        className="flex flex-row justify-center items-center  mx-auto my-2 border p-2 bg bg-gradient-to-r from-blue-900 via-blue-800 via-blue-700 to-blue-600 rounded-2xl max-w-sm sm:max-w-sm  sm:justify-center lg:max-w-lg  sm:gap-1
        ">
            <img
                className="w-40 rounded-full hover:shadow-2xl"
                src={image} alt={title} />
            <div 
            className="flex flex-col"
            >
                <h2>{title}</h2>
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

