import { useState, useEffect } from 'react'
import { Table } from '../models/Table'
import { Floor } from '../models/Floor'
import {
  useGetFloorsList,
  useGetCurrentFloor,
  useFloorMutations
} from '../service/Floor.service'
import { useTableMutations } from '../service/Table.service'
import FloorsList from '../components/FloorsList'
import FloorItem from '../components/FloorItem'

import ActionBar from '../components/ActionBar'

const MainPage = () => {
  const [floorId, setFloorId] = useState<string | null>(null)

  const { data: floors, refetch } = useGetFloorsList()
  const { data: currentFloor, refetch: refetchFloor } =
    useGetCurrentFloor(floorId)

  const { addFloor, resetFloor, removeFloor } = useFloorMutations()
  const { addTable, updateTable, removeTable } = useTableMutations()

  useEffect(() => {
    if (floors && floors.length && floors.length > 0 && floorId === null) {
      setFloorId(floors[0].id as string)
    }
  }, [floors])

  const handleUpdateTable = (table: Table) => {
    table.floorId = floorId as string
    updateTable(table)
    refetchFloor()
  }
  const handleAddTable = () => {
    const name = `${(currentFloor?.tables?.length || 0) + 1}`
    addTable({ name, floorId: floorId as string } as Table)
    refetchFloor()
  }

  const handleResetFloor = () => {
    resetFloor(currentFloor?.id as string)
    refetchFloor()
  }

  const handleAddFloor = () => {
    const name = `Floor-${(floors?.length || 0) + 1}`
    addFloor({ name } as Floor)
    refetch()
  }

  const handleRemoveFloor = (floorId: string) => {
    removeFloor(floorId)
    refetch()
  }

  const handleChangeFloor = (id: string) => {
    setFloorId(id)
  }

  const removeTableHandler = (table: Table) => {
    removeTable({ ...table, floorId: floorId as string })
    refetchFloor()
  }

  return (
    <div className='flex p-2'>
      <ActionBar onClickAddFloor={handleAddFloor} onClickAddTable={handleAddTable} onClickResetFloor={handleResetFloor} />
      <div>
        <FloorsList 
        selectedFloorId={floorId} 
        onChangeFloor={handleChangeFloor}
        onClickRemoveFloor={handleRemoveFloor}
        floors={floors || []} />
        <FloorItem
          title={`${currentFloor?.name ?? 'Add a floor'}`}
          tables={currentFloor?.tables || []}
          floorId={floorId}
          onRemoveTable={removeTableHandler}
          onDropTable={handleUpdateTable}
        />
      </div>
    </div>
  )
}

export default MainPage
