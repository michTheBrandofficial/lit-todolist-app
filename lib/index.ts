type StorageGetter<T> = () => T | null;
type StorageSetter<T> = (value: T) => T;

export function useStorage<T>(
  key: string
): [StorageGetter<T>, StorageSetter<T>] {
  const getItem: StorageGetter<T> = () => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return null;
  };

  const setItem: StorageSetter<T> = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  };

  return [getItem, setItem];
}
