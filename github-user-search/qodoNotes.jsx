why do i get this error in my console when i run the code

App.jsx: 19 Error fetching user TypeError: response.json is not a function at fetchGithubUser(App.jsx: 15: 35)

You’re mixing APIs.axios already parses the JSON for you and returns it on response.data, so there’s no response.json() method(that’s for the Fetch API).That’s why you get “response.json is not a function.”

Two more notes:

With axios, non - 2xx responses throw automatically, so the manual status check isn’t needed.
    You’re checking username.trim instead of username.trim() in handleSearch, so the empty - input guard won’t work.
        Here’s a fixed version of your component:

import { useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');

    const fetchGithubUser = async (name) => {
        try {
            // axios resolves with parsed data on `data`
            const { data } = await axios.get(`https://api.github.com/users/${name}`);
            console.log(data);
        } catch (error) {
            // axios throws on non-2xx responses; log useful info
            if (axios.isAxiosError(error)) {
                console.error('Error fetching user', error.response?.status, error.message);
            } else {
                console.error('Error fetching user', error);
            }
        }
    };

    const handleSearch = () => {
        const trimmed = username.trim();
        if (trimmed !== '') {
            fetchGithubUser(trimmed);
        } else {
            alert('Enter a user Name');
        }
    };

    return (
        <div>
            <input
                type="text"
                id="username"
                placeholder="Enter Github username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default App;

Copy

Insert

If you prefer using the Fetch API instead of axios, you could do:

    const response = await fetch(https://api.github.com/users/${username});
if (!response.ok) throw new Error(response.status);
const data = await response.json();
App.jsx
[9 / 28 / 2025, 12: 27: 19 AM]
GPT - 5
    / ask @App.jsx

is my line 11 and 12 relevant ?

    Short answer: No.With axios, lines 11–12 are redundant.

        Reason:

axios rejects the promise for any non - 2xx status by default, so your try/catch will run on errors. If the request resolves, response.status is already 2xx, making that check unnecessary.
Those lines would only be relevant if you’ve customized validateStatus to allow non - 2xx to
We were unable to process the request b21e6a44 - 7255 - 4ad4 - aec5 - 983076125a25
App.jsx
[9 / 28 / 2025, 12: 27: 19 AM]
GPT - 5
References
[Stopped]
    / ask @App.jsx

again

No—lines 11 and 12 aren’t needed with axios.Also, response.json() is incorrect for axios; use response.data.

    I’ve updated your component to remove the redundant status check and use response.data, plus slightly improved error handling and input trimming.

        import { useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');

    const fetchGithubUser = async (name) => {
        try {
            // axios returns parsed JSON on `data`
            const { data } = await axios.get(
                `https://api.github.com/users/${encodeURIComponent(name)}`
            );
            console.log(data);
            // TODO: set state with `data` if you want to render it
        } catch (error) {
            // axios throws for non-2xx responses
            if (axios.isAxiosError(error)) {
                console.error('Error fetching user', error.response?.status, error.message);
            } else {
                console.error('Error fetching user', error);
            }
        }
    };

    const handleSearch = () => {
        const trimmed = username.trim();
        if (trimmed !== '') {
            fetchGithubUser(trimmed);
        } else {
            alert('Enter a user Name');
        }
    };

    return (
        <div>
            <input
                type="text"
                id="username"
                placeholder="Enter Github username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default App;

Copy

Insert

App.jsx
[9 / 28 / 2025, 12: 27: 19 AM]
GPT - 5
References
    / ask @App.jsx

convert you code above to fetchapi code

import { useState } from 'react';

function App() {
    const [username, setUsername] = useState('');

    const fetchGithubUser = async (name) => {
        try {
            const response = await fetch(
                `https://api.github.com/users/${encodeURIComponent(name)}`,
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            // TODO: set state with `data` to render user info
        } catch (error) {
            console.error('Error fetching user', error);
        }
    };

    const handleSearch = () => {
        const trimmed = username.trim();
        if (trimmed !== '') {
            fetchGithubUser(trimmed);
        } else {
            alert('Enter a user Name');
        }
    };

    return (
        <div>
            <input
                type="text"
                id="username"
                placeholder="Enter Github username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default App;

Copy

Insert

Note: Since this version uses the Fetch API, you can remove the axios import and dependency.

App.jsx
[9 / 28 / 2025, 12: 27: 19 AM]
GPT - 5
    / ask @App.jsx

can i write an axios code to fetch all githubusers

You can’t fetch “all” GitHub users in one request—the API is paginated.With axios you can fetch pages from GET https://api.github.com/users using the since and per_page params, and loop through pages to collect as many as you need. Below I’ve updated your component to include:

fetchUsersPage: fetches one page(up to 100 users)
fetchAllGithubUsers: loops pages until a max count you specify
Simple UI buttons to fetch the first page, load more, or fetch N users
Notes:

You’ll hit rate limits quickly if unauthenticated.Add a token via env(VITE_GITHUB_TOKEN for Vite or REACT_APP_GITHUB_TOKEN for CRA).
The endpoint returns users in ascending id order; use the last user’s id as the next since cursor.
    import { useState } from 'react';
import axios from 'axios';

// Optional: use a token to avoid low rate limits (60 req/hr unauthenticated)
// For Vite: define VITE_GITHUB_TOKEN in .env
// For CRA: define REACT_APP_GITHUB_TOKEN in .env
const GITHUB_TOKEN =
    (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_GITHUB_TOKEN) ||
    (typeof process !== 'undefined' && process?.env?.REACT_APP_GITHUB_TOKEN) ||
    '';

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github+json',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
});

function App() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [nextSince, setNextSince] = useState(0); // cursor for next page

    // Fetch a single user by username (your original flow)
    const fetchGithubUser = async (name) => {
        try {
            setErrorMsg('');
            const { data } = await api.get(`/users/${encodeURIComponent(name)}`);
            console.log('Single user:', data);
            // Example: you could set a dedicated state to render this user
            // setSelectedUser(data);
        } catch (error) {
            console.error('Error fetching user', error);
            setErrorMsg('Failed to fetch user. Check the username and try again.');
        }
    };

    // Fetch one page of users: https://api.github.com/users?since=<id>&per_page=<n>
    const fetchUsersPage = async (since = 0, perPage = 100) => {
        const { data } = await api.get('/users', {
            params: { since, per_page: perPage },
        });
        // data is an array of users; the next "since" can be the last user's id
        return data;
    };

    // Load the first page of users
    const loadFirstPage = async () => {
        try {
            setLoading(true);
            setErrorMsg('');
            const page = await fetchUsersPage(0, 100);
            setUsers(page);
            setNextSince(page.length ? page[page.length - 1].id : 0);
        } catch (error) {
            console.error('Error fetching users page', error);
            setErrorMsg('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    // Load next page using the stored cursor
    const loadMore = async () => {
        if (!nextSince) return;
        try {
            setLoading(true);
            setErrorMsg('');
            const page = await fetchUsersPage(nextSince, 100);
            setUsers((prev) => [...prev, ...page]);
            setNextSince(page.length ? page[page.length - 1].id : 0);
        } catch (error) {
            console.error('Error fetching more users', error);
            setErrorMsg('Failed to fetch more users.');
        } finally {
            setLoading(false);
        }
    };

    // "Fetch all" up to a cap (e.g., 1000) to avoid infinite loops and rate-limit issues
    const fetchAllGithubUsers = async (maxUsers = 1000) => {
        try {
            setLoading(true);
            setErrorMsg('');
            let all = [];
            let since = 0;

            while (all.length < maxUsers) {
                const remaining = maxUsers - all.length;
                const perPage = Math.min(100, remaining); // GitHub caps per_page at 100
                const page = await fetchUsersPage(since, perPage);
                if (page.length === 0) break;
                all = all.concat(page);
                since = page[page.length - 1].id;
            }

            setUsers(all);
            setNextSince(since); // you can keep paging from here if desired
            console.log(`Fetched ${all.length} users`);
        } catch (error) {
            console.error('Error fetching many users', error);
            setErrorMsg('Failed to fetch users in bulk. You may have hit rate limits.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const trimmed = username.trim();
        if (trimmed !== '') {
            fetchGithubUser(trimmed);
        } else {
            alert('Enter a user Name');
        }
    };

    return (
        <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter Github username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading} style={{ marginLeft: 8 }}>
                    Search user
                </button>
            </div>

            <div style={{ marginBottom: 12 }}>
                <button onClick={loadFirstPage} disabled={loading}>
                    Fetch first 100 users
                </button>
                <button onClick={loadMore} disabled={loading || !nextSince} style={{ marginLeft: 8 }}>
                    Load more
                </button>
                <button onClick={() => fetchAllGithubUsers(500)} disabled={loading} style={{ marginLeft: 8 }}>
                    Fetch 500 users
                </button>
            </div>

            {loading && <div>Loading…</div>}
            {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}

            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.login} (id: {u.id})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

Copy

Insert

Tips:

If you need filtered results(e.g., by name), use the Search API: GET / search / users ? q =
    App.jsx
    [9 / 28 / 2025, 12: 27: 19 AM]
GPT - 5
References
    / ask @App.jsx

write axios code for the filtered results for me,

    Here’s an axios - based search that returns filtered GitHub users using the Search API (/search/users).It includes optional filters(location, minRepos, minFollowers, user / org type), pagination, and a simple UI to display results.

        import { useState } from 'react';
import axios from 'axios';

// Optional: add a token to avoid low rate limits (60 req/hr unauthenticated).
// Vite: define VITE_GITHUB_TOKEN in .env
// CRA: define REACT_APP_GITHUB_TOKEN in .env
const GITHUB_TOKEN =
    (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_GITHUB_TOKEN) ||
    (typeof process !== 'undefined' && process?.env?.REACT_APP_GITHUB_TOKEN) ||
    '';

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github+json',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
});

function App() {
    const [username, setUsername] = useState('');
    const [results, setResults] = useState([]); // filtered users from /search/users
    const [total, setTotal] = useState(0); // total_count from /search/users
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(30);

    // Fetch a single user by exact username (unchanged)
    const fetchGithubUser = async (name) => {
        try {
            setErrorMsg('');
            const { data } = await api.get(`/users/${encodeURIComponent(name)}`);
            console.log('Single user:', data);
            alert(`Found user: ${data.login} (id: ${data.id})`);
        } catch (error) {
            console.error('Error fetching user', error);
            setErrorMsg('Failed to fetch user. Check the username and try again.');
        }
    };

    // Search users with filters using GitHub Search API
    // Options supported:
    // - location: string
    // - minRepos: number
    // - minFollowers: number
    // - type: 'user' | 'org'
    // - page: number (default 1)
    // - perPage: number (default 30; max 100)
    const searchGithubUsers = async (
        query,
        { location, minRepos, minFollowers, type = 'user', page = 1, perPage = 30 } = {}
    ) => {
        try {
            setLoading(true);
            setErrorMsg('');

            const qParts = [];
            if (query) qParts.push(query, 'in:login'); // search by login; remove 'in:login' to broaden
            if (location) qParts.push(`location:${location}`);
            if (typeof minRepos === 'number') qParts.push(`repos:>=${minRepos}`);
            if (typeof minFollowers === 'number') qParts.push(`followers:>=${minFollowers}`);
            if (type === 'user' || type === 'org') qParts.push(`type:${type}`);

            const q = qParts.join(' ').trim();

            const { data } = await api.get('/search/users', {
                params: {
                    q,
                    per_page: Math.min(100, Math.max(1, perPage)),
                    page: Math.max(1, page),
                },
            });

            // data: { total_count, incomplete_results, items: [...] }
            setResults(data.items || []);
            setTotal(data.total_count || 0);
        } catch (error) {
            console.error('Error searching users', error);
            const msg =
                (error.response && error.response.data && error.response.data.message) ||
                'Failed to search users.';
            setErrorMsg(msg);
            setResults([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    // Handlers
    const handleExactUserSearch = () => {
        const trimmed = username.trim();
        if (trimmed !== '') {
            fetchGithubUser(trimmed);
        } else {
            alert('Enter a user Name');
        }
    };

    const handleFilteredSearch = (nextPage = 1) => {
        const trimmed = username.trim();
        if (trimmed === '') {
            alert('Enter a search term (e.g., part of the login)');
            return;
        }
        setPage(nextPage);
        // Adjust filters here as needed:
        searchGithubUsers(trimmed, {
            type: 'user', // or 'org'
            // Example filters; modify/remove as desired:
            // location: 'san francisco',
            // minRepos: 10,
            // minFollowers: 50,
            page: nextPage,
            perPage,
        });
    };

    return (
        <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter Github username or search term"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleExactUserSearch} style={{ marginLeft: 8 }}>
                    Search exact user
                </button>
                <button onClick={() => handleFilteredSearch(1)} style={{ marginLeft: 8 }}>
                    Search users (filtered)
                </button>
            </div>

            {loading && <div>Loading…</div>}
            {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}

            {results.length > 0 && (
                <div style={{ marginTop: 12 }}>
                    <div style={{ marginBottom: 8 }}>
                        Results: {results.length} of ~{total} | Page {page}
                    </div>
                    <ul>
                        {results.map((u) => (
                            <li key={u.id}>
                                <img
                                    src={u.avatar_url}
                                    alt={u.login}
                                    width={24}
                                    height={24}
                                    style={{ verticalAlign: 'middle', marginRight: 8, borderRadius: 12 }}
                                />
                                {u.login} — <a href={u.html_url} target="_blank" rel="noreferrer">profile</a>
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: 8 }}>
                        <button
                            onClick={() => handleFilteredSearch(Math.max(1, page - 1))}
                            disabled={loading || page <= 1}
                            style={{ marginRight: 8 }}
                        >
                            Prev
                        </button>
                        <button onClick={() => handleFilteredSearch(page + 1)} disabled={loading}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

Copy

Insert

Usage notes:

Adjust filters in handleFilteredSearch by setting location, minRepos, and minFollowers as needed.
For heavier use, add a token in .env to avoid rate limits and restart your dev server.
    App.jsx
[9 / 28 / 2025, 12: 27: 19 AM]
GPT - 5
References
    / ask @App.jsx

if i want the usernames to appear in a drop down menu format whiles i type my username in the search bar.the username that contains the typed text are appeared then when i click on the on iprefer, i get its data

You can add an autocomplete dropdown that queries GitHub’s Search API as the user types, and fetch full user details when a suggestion is selected.

    import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Optional: add a token in .env to avoid low rate limits (60 req/hr unauthenticated)
    // Vite: VITE_GITHUB_TOKEN; CRA: REACT_APP_GITHUB_TOKEN
    const GITHUB_TOKEN =
        (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_GITHUB_TOKEN) ||
        (typeof process !== 'undefined' && process?.env?.REACT_APP_GITHUB_TOKEN) ||
        '';

    const commonHeaders = {
        Accept: 'application/vnd.github+json',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    };

    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const fetchGithubUser = async (login) => {
        try {
            setErrorMsg('');
            const { data } = await axios.get(
                `https://api.github.com/users/${encodeURIComponent(login)}`,
                { headers: commonHeaders }
            );
            setSelectedUser(data);
            console.log('Selected user:', data);
        } catch (error) {
            console.error('Error fetching user', error);
            const msg =
                (error.response && error.response.data && error.response.data.message) ||
                'Failed to fetch user.';
            setErrorMsg(msg);
            setSelectedUser(null);
        }
    };

    // Debounced search for suggestions
    useEffect(() => {
        const q = username.trim();
        if (q.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            setHighlightedIndex(-1);
            return;
        }

        let cancelled = false;
        setSuggestionsLoading(true);
        setErrorMsg('');

        const timer = setTimeout(async () => {
            try {
                const { data } = await axios.get('https://api.github.com/search/users', {
                    headers: commonHeaders,
                    params: {
                        q: `${q} in:login`,
                        per_page: 10,
                    },
                });
                if (!cancelled) {
                    setSuggestions(data.items || []);
                    setShowSuggestions(true);
                    setHighlightedIndex(-1);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error searching users', error);
                    const msg =
                        (error.response && error.response.data && error.response.data.message) ||
                        'Failed to search users.';
                    setErrorMsg(msg);
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } finally {
                if (!cancelled) setSuggestionsLoading(false);
            }
        }, 300); // debounce delay

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [username]);

    // Close suggestions on outside click
    useEffect(() => {
        const onDocMouseDown = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', onDocMouseDown);
        return () => document.removeEventListener('mousedown', onDocMouseDown);
    }, []);

    const handleSearchClick = () => {
        const trimmed = username.trim();
        if (trimmed) {
            fetchGithubUser(trimmed);
            setShowSuggestions(false);
        } else {
            alert('Enter a user name');
        }
    };

    const selectSuggestion = (sugg) => {
        setUsername(sugg.login);
        setShowSuggestions(false);
        setSuggestions([]);
        setHighlightedIndex(-1);
        fetchGithubUser(sugg.login);
    };

    const onKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((idx) => Math.min(idx + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((idx) => Math.max(idx - 1, 0));
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0) {
                e.preventDefault();
                selectSuggestion(suggestions[highlightedIndex]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const renderHighlightedLogin = (login, query) => {
        const i = login.toLowerCase().indexOf(query.toLowerCase());
        if (i === -1) return login;
        const before = login.slice(0, i);
        const match = login.slice(i, i + query.length);
        const after = login.slice(i + query.length);
        return (
            <>
                {before}
                <mark>{match}</mark>
                {after}
            </>
        );
    };

    return (
        <div ref={containerRef} style={{ padding: 16, maxWidth: 480 }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: 8 }}>
                Search GitHub users
            </label>
            <div style={{ position: 'relative' }}>
                <input
                    ref={inputRef}
                    type="text"
                    id="username"
                    placeholder="Type a username (e.g., tor)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    style={{ width: '100%', padding: '8px 12px' }}
                    aria-autocomplete="list"
                    aria-controls="user-suggestions"
                    aria-expanded={showSuggestions}
                    aria-activedescendant={
                        highlightedIndex >= 0 ? `sugg-${suggestions[highlightedIndex]?.id}` : undefined
                    }
                />
                <button onClick={handleSearchClick} style={{ marginTop: 8 }}>
                    Search
                </button>

                {showSuggestions && (
                    <div
                        role="listbox"
                        id="user-suggestions"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: '#fff',
                            border: '1px solid #ccc',
                            borderTop: 'none',
                            zIndex: 10,
                            maxHeight: 240,
                            overflowY: 'auto',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        {suggestionsLoading && (
                            <div style={{ padding: 8, color: '#666' }}>Loading…</div>
                        )}
                        {!suggestionsLoading && suggestions.length === 0 && (
                            <div style={{ padding: 8, color: '#666' }}>No matches</div>
                        )}
                        {!suggestionsLoading &&
                            suggestions.map((s, idx) => (
                                <div
                                    key={s.id}
                                    id={`sugg-${s.id}`}
                                    role="option"
                                    aria-selected={idx === highlightedIndex}
                                    onMouseDown={(e) => {
                                        // Prevent input blur before click handler
                                        e.preventDefault();
                                    }}
                                    onClick={() => selectSuggestion(s)}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '8px 10px',
                                        cursor: 'pointer',
                                        background: idx === highlightedIndex ? '#f0f6ff' : 'white',
                                    }}
                                >
                                    <img
                                        src={s.avatar_url}
                                        alt={s.login}
                                        width={24}
                                        height={24}
                                        style={{ borderRadius: 12 }}
                                    />
                                    <span>{renderHighlightedLogin(s.login, username)}</span>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {errorMsg && (
                <div style={{ marginTop: 12, color: 'red' }}>{errorMsg}</div>
            )}

            {selectedUser && (
                <div
                    style={{
                        marginTop: 16,
                        border: '1px solid #ddd',
                        padding: 12,
                        borderRadius: 6,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                            src={selectedUser.avatar_url}
                            alt={selectedUser.login}
                            width={64}
                            height={64}
                            style={{ borderRadius: 32 }}
                        />
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 600 }}>
                                {selectedUser.name || selectedUser.login}
                            </div>
                            <a href={selectedUser.html_url} target="_blank" rel="noreferrer">
                                @{selectedUser.login}
                            </a>
                        </div>
                    </div>
                    <div style={{ marginTop: 8, color: '#444' }}>
                        {selectedUser.bio && <div>{selectedUser.bio}</div>}
                        <div style={{ marginTop: 6 }}>
                            Followers: {selectedUser.followers} • Following: {selectedUser.following} •
                            Repos: {selectedUser.public_repos}
                        </div>
                        {selectedUser.location && (
                            <div style={{ marginTop: 6 }}>Location: {selectedUser.location}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;



