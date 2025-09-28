import { useState, useEffect } from 'react';
import fetchUserData from '../services/githubService';

export default function GitHubSearch() {
    // 🔍 Form input states
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');

    // 📦 Search results and status
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    // 🚀 Handle form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        if (username.trim() === '') return alert('Enter a username');

        setLoading(true);
        setError(false);
        setUsers([]);
        setPage(1);

        try {
            const { users: fetchedUsers, totalCount } = await fetchUserData({ username, location, minRepos, page: 1 });
            setUsers(fetchedUsers);
            setTotalCount(totalCount);
        } catch (error) {
            setError(true);
            setErrMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ➕ Load more users
    const loadMore = async () => {
        const nextPage = page + 1;
        setLoading(true);

        try {
            const { users: moreUsers } = await fetchUserData({ username, location, minRepos, page: nextPage });
            setUsers((prev) => [...prev, ...moreUsers]);
            setPage(nextPage);
        } catch (error) {
            setError(true);
            setErrMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* 🔍 Search Form */}
            <form onSubmit={handleSearch} className="bg-white shadow-lg rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">GitHub User Search</h2>

                {/* Inputs */}
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (optional)"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input type="number" value={minRepos} onChange={(e) => setMinRepos(e.target.value)} placeholder="Min Repos (optional)"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Search
                </button>
            </form>

            {/* 📊 Results */}
            <div className="mt-8 space-y-6">
                {loading && <p className="text-gray-500 text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{errMessage || 'User not found.'}</p>}

                {users.map((user) => (
                    <div key={user.id} className="bg-gray-50 p-6 rounded-lg shadow-md flex gap-6 items-center">
                        <img src={user.avatar_url} alt={`${user.login} avatar`} className="h-24 w-24 rounded-full object-cover" />
                        <div className="flex-1 text-left">
                            <h3 className="text-xl font-bold text-gray-800">{user.login}</h3>
                            <p className="text-sm text-gray-500">🔗 <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View Profile</a></p>
                        </div>
                    </div>
                ))}

                {/* ➕ Load More Button */}
                {users.length < totalCount && (
                    <button onClick={loadMore} className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition">
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
}