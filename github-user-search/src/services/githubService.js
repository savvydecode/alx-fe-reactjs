
import axios from "axios";

const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;
const fetchGithubUser = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`,{
            headers: {
                Authorization: `Bearer ${GITHUB_API_KEY}`
            }
        });
        if(response.status === 200){
            return (response.data)
        } else{
            throw new Error(`${response.status}`)
        }
        

    } catch (error) {
        return (error.message);
    }
}

export default fetchGithubUser;