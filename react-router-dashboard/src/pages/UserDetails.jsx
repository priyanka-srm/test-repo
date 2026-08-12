import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>User Details</h1>

      <h2>User ID: {id}</h2>

      <p>You are viewing the details of user {id}.</p>
    </div>
  );
}

export default UserDetails;
