interface UserProps {
    username: string;
}

const User = ({ username }: UserProps) => {
    return <div>Hello, {username}!</div>;
};

export default User;
