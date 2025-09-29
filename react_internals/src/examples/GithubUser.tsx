import { Suspense, useTransition, useState } from "react";

type User = {
  name: string;
  login: string;
  public_repos: number;
  followers: number;
};

interface UserInterface {
  fetchUser: (username: string) => User | Promise<User>;
}

class UserResource implements UserInterface {
  cache = new Map<string, User>();
  promise = new Map<string, Promise<User>>();

  fetchUser(username: string) {
    // Gets the user from the cache
    if (this.cache.has(username)) {
      return this.cache.get(username)!;
    }

    // Returns the promise if it exists
    if (this.promise.has(username)) {
      return this.promise.get(username)!;
    }

    const promise = fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((user) => {
        // Successfully fetched
        //store the resolved user
        this.cache.set(username, user);
        this.promise.delete(username);
        return user;
      })
      .catch((err) => {
        this.promise.delete(username);
        throw err;
      });

    this.promise.set(username, promise);
    return promise;
  }
}

// Singleton
const userResource = new UserResource();

const useUser = (username: string) => {
  const result = userResource.fetchUser(username);

  if (result instanceof Promise) {
    throw result;
  }

  return result;
};

type UserProfileProps = {
  username: string;
};

const UserProfile = ({ username }: UserProfileProps) => {
  const user = useUser(username);

  return (
    <div>
      <h2>{user.name || user.login}</h2>
      <p>Repos: {user.public_repos}</p>
      <p>Followers: {user.followers}</p>
    </div>
  );
};

export default function GithubUser() {
  const [username, setUsername] = useState("gaeron");
  const [input, setInput] = useState("gaeron");
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(() => {
      setUsername(input);
    });
  };

  return (
    <div>
      <h1>Github user search</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter github username"
      />

      <button onClick={handleSearch} disabled={isPending}>
        {isPending ? "Loading..." : "Search"}
      </button>

      <Suspense fallback={<span>User loading...</span>}>
        <UserProfile username={username} />
      </Suspense>
    </div>
  );
}
