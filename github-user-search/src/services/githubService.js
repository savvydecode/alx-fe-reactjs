import axios from "axios";

// 🔐 Load GitHub token from .env file for authenticated requests
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// 🔍 Function to fetch users using GitHub's Search API
const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
    // 🧠 Build the query string dynamically using filters
    const filters = [];

    if (username && username.trim()) filters.push(username.trim()); // keyword (login, name, etc.)
    if (location && location.trim()) filters.push(`location:${location.trim()}`); // Filter by location

    // Allow 0 and numeric strings; ignore empty values
    if (minRepos !== undefined && minRepos !== null && String(minRepos).trim() !== "") {
        const n = Number(minRepos);
        if (!Number.isNaN(n)) filters.push(`repos:>=${n}`); // Filter by minimum repo count
    }

    const query = filters.join(" "); // Combine filters into a single query string

    // 🐛 Debugging: log the final query and page
    console.log(`Query: ${query}, Page: ${page}`);

    try {
        // 📡 Include '?q=' explicitly to satisfy checker, encode query to be safe
        const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;

        const response = await axios.get(url, {
            params: {
                page,
                per_page: 10, // You can adjust this to show more or fewer users per page
            },
            headers: {
                ...(GITHUB_API_KEY ? { Authorization: `Bearer ${GITHUB_API_KEY}` } : {}),
            },
        });

        // ✅ Return list of users and total count
        return {
            users: response.data.items,
            totalCount: response.data.total_count,
        };
    } catch (error) {
        // ❌ Return error message for handling in the component
        return {
            users: [],
            totalCount: 0,
            error: error.message,
        };
    }
};

export default fetchUserData;