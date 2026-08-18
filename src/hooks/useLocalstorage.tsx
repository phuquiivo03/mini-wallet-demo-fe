export function useLocalStorage<T>() {
  const keys = {
    auth: {
      authToken: "key_auth",
      refeshToken: "key_refesh",
    },
  };
  const set = (key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const get = (key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return;
    return JSON.parse(item);
  };
  return { keys, get, set };
}
