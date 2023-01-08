import {
  getLocalStorageItem,
  getLocalStorageList,
  setToLocalStorage
} from './localStorageQueries'
import { LOCALSTORAGE_KEY } from '../consts/localStorageConsts'
import { Floor } from '../models/Floor'
import { Table } from '../models/Table'

const getFloorsList = () => getLocalStorageList<Floor>(LOCALSTORAGE_KEY)

const getFloorById = (id: string) =>
  getLocalStorageItem<Floor>(LOCALSTORAGE_KEY, id as string)

const saveFloors = (data: Floor[]) =>
  setToLocalStorage<Floor>({ key: LOCALSTORAGE_KEY, data })

const saveFloor = (floor: Floor) => {
  const floors = getFloorsList()
  const newFloors = floors.map((p) => {
    if (floor.id === p.id) return floor
    return p
  })
  saveFloors(newFloors)
}

const getTablesByFloorId = (floorId: string): Table[] => {
  const floor = getFloorById(floorId as string)
  return floor?.tables || []
}

export {
  getFloorsList,
  getFloorById,
  saveFloors,
  saveFloor,
  getTablesByFloorId
}
