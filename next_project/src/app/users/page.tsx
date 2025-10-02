const getServerData = () => {
  return fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => data);
};

export default async function Users() {
  const { users } = await getServerData();

  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
      }}
    >
      {users.map(
        (user: { id: string; firstName: string; lastName: string }) => (
          <div key={user.id}>
            <span style={{ color: "white" }}>
              {user.firstName} {user.lastName}
            </span>
          </div>
        )
      )}
    </div>
  );
}
