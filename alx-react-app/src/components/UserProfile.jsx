const UserProfile = (props) => {
    return (
        <>
            <h2>{props.name}</h2>
            <p>{props.age}</p>
            <p>{props.bio}</p>
        </>
    )
};

export default UserProfile;
