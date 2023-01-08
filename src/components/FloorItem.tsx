import React from 'react'
import { Table } from '../models/Table'
import TableItem from './TableItem'

const CustomStyle = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '600px',
  height: '300px',
  background: 'whitesmoke'
} as React.CSSProperties

interface Props {
  title: string
  tables: Table[]
  onDropTable: (table: Table) => void
  onRemoveTable: (table: Table) => void
  floorId: string | null
}
const FloorItem = (props: Props) => {
  const { title, tables, onDropTable, floorId, onRemoveTable } = props
  return (
    <div className={"flex flex-col"}>
      <h3 className="text-indigo-500 font-bold text-2xl">{title}</h3>
      <div style={CustomStyle}>
        {tables.map((table) => {
          return <TableItem
            key={table.id}
            table={{ ...table, floorId } as Table}
            onDropTable={onDropTable}
            onRemoveTable={() => onRemoveTable(table)} />
        })}
      </div>
    </div>
  )
}
export default FloorItem
