const UserProfile = (props) => {
    const age = props.age;
    const name = props.name;
    const bio = props.bio
    return (
        <>
            <h2>{name}</h2>
            <p>{age}</p>
            <p>{bio}</p>
        </>
    )
};

export default UserProfile;
