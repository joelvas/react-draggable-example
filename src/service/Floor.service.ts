import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Floor } from '../models/Floor'
import {
  getFloorById,
  getFloorsList,
  saveFloors
} from '../query/reusableQueries'

export const useGetFloorsList = () => {
  const [data, setData] = useState<Floor[]>()
  useEffect(() => {
    const floors = getFloorsList()
    setData(floors)
  }, [])

  const refetch = () => {
    const floors = getFloorsList()
    setData(floors)
  }
  return { data, refetch }
}

export const useGetCurrentFloor = (floorId: string | null) => {
  const [data, setData] = useState<Floor | null>(null)
  useEffect(() => {
    if (floorId !== null) {
      const floor = getFloorById(floorId)
      setData(floor)
    }
  }, [floorId])

  const refetch = () => {
    if (floorId !== null) {
      const floor = getFloorById(floorId)
      setData(floor)
    }
  }

  return { data, refetch }
}

export const useFloorMutations = () => {
  const saveFloor = (floor: Floor) => {
    const floors = getFloorsList()
    const newFloors = floors.map((p) => {
      if (floor.id === p.id) return floor
      return p
    })
    saveFloors(newFloors)
  }

  const addFloor = ({ name }: Floor) => {
    const newFloor = {
      id: uuidv4(),
      name,
      tables: []
    } as Floor
    const floors = getFloorsList()

    saveFloors([...floors, newFloor])
  }

  const removeFloor = (floorId: string) => {
    const floors = getFloorsList()
    const newFloors = floors.filter((item) => item.id !== floorId)
    saveFloors(newFloors)
  }

  const resetFloor = (floorId: string) => {
    const floor = getFloorById(floorId)
    saveFloor({ ...floor, tables: [] } as Floor)
  }

  return { addFloor, resetFloor, removeFloor }
}
