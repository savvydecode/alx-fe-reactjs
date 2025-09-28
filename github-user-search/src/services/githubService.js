import axios from "axios";

// 🔐 Load GitHub token from .env file for authenticated requests
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// 🔍 Function to fetch users using GitHub's Search API
const fetchUserData = async (username, location, minRepos) => {
    // 🧠 Build the query string dynamically based on provided filters
    let query = '';

    // 🔤 Add username keyword if provided (can match name, login, etc.)
    if (username) {
        query += `${username}`;
    }

    // 🌍 Add location filter if provided
    if (location) {
        query += ` location:${location}`;
    }

    // 📦 Add minimum repository count filter if provided
    if (minRepos) {
        query += ` repos:>=${minRepos}`;
    }

    // 🐛 Debugging: log the final query string before sending request
    console.log(`Query: ${query}`);

    try {
        // 📡 Send GET request to GitHub Search API with constructed query
        const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_KEY}` // Use token for authenticated requests
            }
        });

        // ✅ Check for successful response
        if (response.status !== 200) {
            throw new Error(`${response.status}`); // Throw error if response is not OK
        }

        // 🐛 Debugging: log full response data
        console.log(response.data);

        // 🧾 Return the first matched user or a fallback message
        return response.data.items || 'Request failed with status code 404';
    } catch (error) {
        // ❌ Return error message for handling in the component
        return error.message;
    }
};

export default fetchUserData;
