"use client";
import { redirect } from "next/navigation";

const useAuth = () => {
  return localStorage.getItem("token") ? true : false;
};

export default function Profile() {
  const isAuth = useAuth();
  // token

  if (!isAuth) {
    redirect("/");
  }

  return (
    <div>
      <h1>User profile</h1>
    </div>
  );
}
