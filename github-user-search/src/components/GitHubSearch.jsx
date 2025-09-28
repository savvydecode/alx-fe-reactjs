import { useEffect, useState } from 'react';
import fetchGithubUser from '../services/github';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function GitHubSearch() {
    const [username, setUsername] = useState("")
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true)
        if (username.trim() !== "") {

            try {
                const data = await fetchGithubUser(username);
                setUserData(data);
                setLoading(false)
            } catch (error) {
                setUserData(null)
                console.log(error)
            }
        } else {
            alert('Enter a user Name');
        }
    }

    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
        <div>
            <input
                type="text"
                id='username'
                placeholder='Enter Github username'
                value={username}
                onChange={(e) => (setUsername(e.target.value))}
            />
            <button onClick={handleSearch}>Search</button>
            <hr />
            {loading && <p>Loading Data</p> }
                {userData &&  <div className='user-card' style={{ marginTop: '1rem' }}>
                    <img src={userData.avatar_url} alt="Avatar" width={100} />
                    <div className="user-info-container">
                        <h2>{userData.name || userData.login}</h2>
                    <p>{userData.bio}</p>
                    <a href={userData.html_url} target="_blank" rel="noreferrer">View Profile</a>
                    </div>
                </div>
            }

        </div>


    )

}