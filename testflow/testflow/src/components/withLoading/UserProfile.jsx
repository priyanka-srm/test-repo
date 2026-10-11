import withLoading from "./withLoading";

function UserProfile({ user }) {
  return (
    <section>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </section>
  );
}

const UserProfileWithLoading = withLoading(UserProfile);

export default UserProfileWithLoading;
