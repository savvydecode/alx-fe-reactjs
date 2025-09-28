import { useEffect, useState } from 'react';
import fetchUserData from '../services/githubService';

export default function GitHubSearch() {
    // 🧠 Form input states for search criteria
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');

    // 📦 State for API response and status indicators
    const [userData, setUserData] = useState(null);     // Stores fetched user data
    const [loading, setLoading] = useState(false);      // Tracks loading state
    const [error, setError] = useState(false);          // Tracks error state
    const [errMessage, setErrMessage] = useState('');   // Stores error message

    // 🚀 Handles form submission and API call
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevents page reload on form submit

        if (username.trim() !== '') {
            // Reset states before new search
            setLoading(true);
            setError(false);
            setUserData(null);

            try {
                // 🔍 Fetch user data from GitHub API
                const data = await fetchUserData(username);

                // 🛑 Handle 404 error manually
                if (data === 'Request failed with status code 404') {
                    throw new Error(`${data}`);
                } else {
                    // 🧠 Apply advanced filters: location and repo count
                    const userLocation = location
                        ? userData.location?.toLowerCase().includes(location.toLowerCase())
                        : true;

                    const userRepos = minRepos
                        ? userData.public_repos >= parseInt(minRepos)
                        : true;

                    // ✅ If user meets filter criteria, update state
                    if (userLocation && userRepos) {
                        setUserData(data);
                        setLoading(false);
                    }
                }
            } catch (error) {
                // ❌ Handle errors gracefully
                setUserData(null);
                setError(true);
                setErrMessage(`${error}`);
                console.log(`${error}`);
            } finally {
                // 🧹 Cleanup: reset loading and clear username input
                setLoading(false);
                setUsername('');
            }
        } else {
            // ⚠️ Prompt user if username is empty
            alert('Enter a user Name');
        }
    };

    // 🐛 Debugging: log user data whenever it updates
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div className="w-full mx-auto px-4 py-8 flex flex-col justify-center md:w-40vw p-5">
            {/* 🔍 Search Form */}
            <form onSubmit={handleSearch} className="bg-white shadow-lg rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">🔍 GitHub User Search</h2>

                {/* 🧑 Username Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. torvalds"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 🌍 Location Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location (optional)</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. San Francisco"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 📦 Minimum Repositories Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Repositories (optional)</label>
                    <input
                        type="number"
                        value={minRepos}
                        onChange={(e) => setMinRepos(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 🔘 Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Search
                </button>
            </form>

            {/* 📊 Results Section */}
            <div className="mt-10">
                {/* ⏳ Loading Indicator */}
                {loading && <p className="text-gray-500 text-center">Loading...</p>}

                {/* ❌ Error Message */}
                {error && (
                    <p className="text-red-500 text-center">
                        {errMessage || "Looks like we can't find the user."}
                    </p>
                )}

                {/* ✅ Display User Info */}
                {userData && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex gap-6 items-center">
                        <img
                            src={userData.avatar_url}
                            alt={`${userData.login} avatar`}
                            className="h-32 rounded-md object-cover shrink-0"
                        />
                        <div className="flex-1 text-left">
                            <h3 className="text-xl font-bold text-gray-800">
                                {userData.name || userData.login}
                            </h3>
                            <p className="text-gray-600 mb-2">{userData.bio}</p>
                            <p className="text-sm text-gray-500">📍 {userData.location || 'No location listed'}</p>
                            <p className="text-sm text-gray-500">📦 {userData.public_repos} public repositories</p>
                            <a
                                href={userData.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-4 text-blue-600 hover:underline"
                            >
                                View GitHub Profile →
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}