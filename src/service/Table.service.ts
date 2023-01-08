import { v4 as uuidv4 } from 'uuid'
import { Table } from '../models/Table'
import { Floor } from '../models/Floor'
import { getFloorById, saveFloor } from '../query/reusableQueries'

export const useTableMutations = () => {
  const addTable = ({ name, floorId }: Table) => {
    const newTable = {
      id: `${uuidv4()}`,
      name,
      floorId,
      position: {
        x: 0,
        y: 0
      }
    } as Table
    const floor = getFloorById(floorId as string)
    const tables = [...(floor?.tables || []), newTable]
    saveFloor({ ...floor, tables } as Floor)
    return newTable
  }

  const removeTable = ({ floorId, id }: Table): void => {
    console.log('remove')
    const floor = getFloorById(floorId as string)
    const newTables = floor?.tables?.filter((item) => item.id !== id)

    saveFloor({ ...floor, tables: newTables } as Floor)
  }

  const updateTable = ({ floorId, ...table }: Table) => {
    const floor = getFloorById(floorId as string)
    const tables = floor?.tables?.map((t) => {
      if (t.id == table.id) return table
      return t
    })
    saveFloor({ ...floor, tables } as Floor)
  }

  return { addTable, updateTable, removeTable }
}
