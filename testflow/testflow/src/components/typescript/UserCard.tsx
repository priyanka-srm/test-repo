type UserCardProps = {
  name: string;
  role: string;
  isActive?: boolean;
};

function UserCard({ name, role, isActive = true }: UserCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
    </article>
  );
}

export default UserCard;
