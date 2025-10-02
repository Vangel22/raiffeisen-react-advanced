"use client";
import { useParams } from "next/navigation";

export default function UserDashboard() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User {userId}</h1>
    </div>
  );
}
