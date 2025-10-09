function UserProfile() {
    return (
        <div className="user-profile bg-gray-100 max-w-sm sm:max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg p-8 sm:p-4 md:p-8 hover:shadow-xl">
            <img  
            className="rounded-full w-36 h-36 mx-auto sm:w-24 sm:h-24 md:w-36 md:h-36  hover:scale-110 transition-transform duration-300 ease-in-out"
            src="https://placehold.co/150" alt="User" />
            
            <h1
            className="text-xl text-blue-800 hover:text-blue-500 my-4 sm:text-lg md:text-xl"
            >John Doe</h1>
            <p
            className="text-gray-600 text-base sm:text-sm md:text-base"
            >Developer at Example Co. Loves to write code and explore new technologies.</p>
        </div>
    );
}

export default UserProfile;