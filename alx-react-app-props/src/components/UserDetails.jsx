
import { useContext } from "react";
import { myContext } from "./UserContext";


function UserDetails({ userData = useContext(myContext) }){
    return (
        <div>
            <p>Name: { userData.name }</p>
            <p>Email: { userData.email }</p>
        </div>
    )
}

export default UserDetails;