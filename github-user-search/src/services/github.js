
import axios from "axios";

const fetchGithubUser = async (username) => {
    try {
        const { data } = await axios.get(`https://api.github.com/users/${username}`);
        return (data)

    } catch (error) {
        return (error);
    }
}

export default fetchGithubUser;