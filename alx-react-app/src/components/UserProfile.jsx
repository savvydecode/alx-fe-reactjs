const UserProfile = ({name, age, bio}) => {
    return (
        <>
            <h2>{name}</h2>
            <p>{age}</p>
            <p>{bio}</p>
        </>
    )
};

export default UserProfile;
