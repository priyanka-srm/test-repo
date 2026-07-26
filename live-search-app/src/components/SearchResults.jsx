import { useEffect, useRef } from "react";
function SearchResults({ query, category }) {
  const previousQuery = useRef("");
  const users = [
    {
      id: 1,
      name: "Priya",
      role: "Frontend Developer",
    },
    {
      id: 2,
      name: "Rohit",
      role: "Backend Developer",
    },
    {
      id: 3,
      name: "Nithya",
      role: "UI Designer",
    },
    {
      id: 4,
      name: "Mathan",
      role: "Full Stack Developer",
    },
    {
      id: 5,
      name: "Arun",
      role: "Frontend Developer",
    },
    {
      id: 6,
      name: "Virat",
      role: "Software Engineer",
    },
    {
      id: 7,
      name: "Sriram",
      role: "Backend Developer",
    },
    {
      id: 8,
      name: "Akshay",
      role: "UI Designer",
    },
  ];
  useEffect(() => {
    console.log("Previous Search:", previousQuery.current);
    console.log("Current Search:", query);
    previousQuery.current = query;
  }, [query]);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Search component active");
    }, 5000);
    return () => {
      clearInterval(timer);
      console.log("Cleanup executed");
    };
  }, []);
  // Empty search la results kaata koodathu
  if (!query.trim()) {
    return null;
  }
  const searchText = query.toLowerCase();
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText);
      const matchesCategory =
        category === "All" || user.role.includes(category);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div>
      <h3>Results: {filteredUsers.length}</h3>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.role}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
export default SearchResults;
