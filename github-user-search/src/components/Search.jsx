import { useEffect, useState } from 'react';
import fetchGithubUser from '../services/githubService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function fetchUserData() {
    const [username, setUsername] = useState("")
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (username.trim() !== "") {
            setLoading(true)
            setError(false)
            setUserData(null)
            try {
                const data = await fetchGithubUser(username);
                setUserData(data);
                setLoading(false)
                if (data == "Request failed with status code 404"){
                    throw new Error(`${data}`);
                }
            } catch (error) {
                setUserData(null);
                setError(true);
                setErrMessage(`${error}`)
                console.log(`${error}`)
            } finally{
                setLoading(false);
            }
        } else {
            alert('Enter a user Name');
        }
    }

   /*  useEffect(() => {
        console.log(userData)
    }, [userData]) */

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

            {/**CONDITIONAL RENDERING */}
            {loading && <p style={{textAlign: 'center'}}>Loading...</p> }
            {error && <div>
                <p>Looks like we cant find the user.</p>
                <p>{errMessage}</p>
            </div>}
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