import { TiDelete } from "react-icons/ti";
import { Table } from "../models/Table";

interface Props {
  onClickDeleteTable: () => void
  table: Table
}
const TableItemContent = ({ onClickDeleteTable, table }: Props) => {
  return (
    <div className="flex relative justify-center place-items-center h-full w-full">
      <button onClick={onClickDeleteTable} className="text-xl absolute bottom-9 left-9">
        <TiDelete className='text-red-700' />
      </button>
      <span className='text-xs'>{table.name}</span>
    </div>
  )
}
export default TableItemContent