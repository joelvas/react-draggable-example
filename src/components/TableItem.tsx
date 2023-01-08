import React from 'react'
import Draggable, {
  ControlPosition,
  DraggableEvent,
  DraggableData
} from 'react-draggable'
import { Table } from '../models/Table'
import TableItemContent from './TableItemContent'

const CustomStyle = {
  display: 'flex',
  width: '50px',
  height: '50px',
  cursor: 'pointer',
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px 0px #41414171'
} as React.CSSProperties

interface Props {
  table: Table
  onDropTable: (table: Table) => void
  onRemoveTable: () => void
}
const TableItem = ({ table, onDropTable, onRemoveTable }: Props) => {
  const [style, setStyle] = React.useState<React.CSSProperties>(CustomStyle)
  const handleMouseDown = () => {
    const boxShadow = '0px 2px 4px 0px #41414171'
    const zIndex = 2
    setStyle((value) => {
      return { ...value, boxShadow, zIndex }
    })
  }
  const handleStop = (e: DraggableEvent, dragElement: DraggableData) => {
    const boxShadow = '0px 2px 4px 0px #41414171'
    const zIndex = 0
    setStyle((value) => {
      return { ...value, boxShadow, zIndex }
    })

    const position = {
      x: dragElement.x,
      y: dragElement.y
    }
    onDropTable({ ...table, position })
  }
  return (
    <Draggable
      bounds="parent"
      onMouseDown={handleMouseDown}
      onStop={handleStop}
      position={table.position as ControlPosition}
    >
      <div style={style}>
        <TableItemContent onClickDeleteTable={onRemoveTable} table={table} />
      </div>
    </Draggable>
  )
}
export default TableItem
