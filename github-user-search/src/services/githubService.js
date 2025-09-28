import axios from "axios";

// 🔐 Load GitHub token from .env file for authenticated requests
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// 🔍 Function to fetch users using GitHub's Search API
const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
    // 🧠 Build the query string dynamically using filters
    const filters = [];

    if (username) filters.push(username); // Match keyword (can be name, login, etc.)
    if (location) filters.push(`location:${location}`); // Filter by location
    if (minRepos) filters.push(`repos:>=${minRepos}`); // Filter by minimum repo count

    const query = filters.join(' '); // Combine filters into a single query string

    // 🐛 Debugging: log the final query and page
    console.log(`Query: ${query}, Page: ${page}`);

    try {
        // 📡 Send GET request to GitHub Search API with pagination
        const response = await axios.get(`https://api.github.com/search/users`, {
            params: {
                q: query,
                page: page,
                per_page: 10 // You can adjust this to show more or fewer users per page
            },
            headers: {
                Authorization: `Bearer ${GITHUB_API_KEY}` // Use token for higher rate limits
            }
        });

        // ✅ Return list of users and total count
        return {
            users: response.data.items,
            totalCount: response.data.total_count
        };
    } catch (error) {
        // ❌ Return error message for handling in the component
        return {
            users: [],
            totalCount: 0,
            error: error.message
        };
    }
};

export default fetchUserData;
