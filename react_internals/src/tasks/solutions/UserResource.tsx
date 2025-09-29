// Resource management for Suspense
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

class UserResourceManager {
  private cache = new Map<string, User[]>();
  private promises = new Map<string, Promise<User[]>>();

  fetchUsers(): User[] | Promise<User[]> {
    const cacheKey = "users";

    // Return cached data if available
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Return existing promise if already fetching
    if (this.promises.has(cacheKey)) {
      return this.promises.get(cacheKey)!;
    }

    // Create new fetch promise
    const promise = fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((users: User[]) => {
        // Cache the resolved data
        this.cache.set(cacheKey, users);
        this.promises.delete(cacheKey);
        return users;
      })
      .catch((error) => {
        this.promises.delete(cacheKey);
        throw error;
      });

    this.promises.set(cacheKey, promise);
    return promise;
  }

  // Method to clear cache (useful for testing)
  clearCache() {
    this.cache.clear();
    this.promises.clear();
  }
}

// Create singleton instance
const userResourceManager = new UserResourceManager();

// Hook that integrates with Suspense
export const useUsers = (): User[] => {
  const result = userResourceManager.fetchUsers();

  if (result instanceof Promise) {
    throw result; // Let Suspense handle the promise
  }

  return result;
};

// Export the manager for cache management
export { userResourceManager };
