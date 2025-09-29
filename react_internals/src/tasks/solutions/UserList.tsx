import { useUsers } from "./UserResource";

export default function UserList() {
  const users = useUsers();

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white" }}>Users from API ({users.length} users)</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#2a2a2a",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              color: "white",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "white" }}>
              {user.name}
            </h3>

            <div style={{ marginBottom: "8px", color: "white" }}>
              <strong>Username:</strong> @{user.username}
            </div>

            <div style={{ marginBottom: "8px", color: "white" }}>
              <strong>Email:</strong> {user.email}
            </div>

            <div style={{ marginBottom: "8px", color: "white" }}>
              <strong>Phone:</strong> {user.phone}
            </div>

            <div style={{ marginBottom: "8px", color: "white" }}>
              <strong>Website:</strong>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#66b3ff",
                  textDecoration: "none",
                  marginLeft: "5px",
                }}
              >
                {user.website}
              </a>
            </div>

            <div
              style={{
                padding: "10px",
                backgroundColor: "#1a1a1a",
                borderRadius: "4px",
                fontSize: "14px",
                color: "white",
              }}
            >
              <div>
                <strong>Address:</strong>
              </div>
              <div>
                {user.address.street}, {user.address.suite}
              </div>
              <div>
                {user.address.city}, {user.address.zipcode}
              </div>

              <div style={{ marginTop: "8px" }}>
                <strong>Company:</strong> {user.company.name}
              </div>
              <div style={{ fontStyle: "italic", color: "#ccc" }}>
                "{user.company.catchPhrase}"
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
