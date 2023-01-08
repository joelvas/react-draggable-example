export const getLocalStorageList = <T,>(key: string): T[] => {
  const localStorageData = localStorage.getItem(key) as string
  const data = JSON.parse(localStorageData) || []
  return data as T[]
}

export const getLocalStorageItem = <T,>(key: string, id: string): T | null => {
  const data = getLocalStorageList<T[]>(key) as T[]
  const object = data.find((object: T): boolean => {
    const o = object as { id: string }
    return o.id === id
  })
  return object ?? null
}

interface Params<T> {
  key: string
  data: T[]
}
export const setToLocalStorage = <T,>({ key, data }: Params<T>): void => {
  localStorage.setItem(key, JSON.stringify(data))
}
