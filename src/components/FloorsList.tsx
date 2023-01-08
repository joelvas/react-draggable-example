import { Floor } from '../models/Floor'
import { TiDelete } from "react-icons/ti";

interface Props {
  floors: Floor[]
  onChangeFloor: (id: string) => void
  selectedFloorId: string | null
  onClickRemoveFloor: (floorId: string) => void
}
const FloorsList = (props: Props) => {
  const { floors, onChangeFloor, selectedFloorId, onClickRemoveFloor } = props
  const handleChangeFloor = (id: string) => {
    onChangeFloor(id)
  }
  const buttonClassName = "border rounded-lg px-3 border-slate-500 shadow-lg"
  const selectedButtonStyle = `bg-slate-500 text-white shadow-slate-200`
  const defaultButtonStyle = `text-slate-700 shadow-slate-300`
  return (
    <div className="flex flex-row p-1 gap-2">
      {floors.map((floor) => {
        return (
          <div key={floor.id} className="relative">
            <button onClick={() => onClickRemoveFloor(floor.id as string)} className="text-xl absolute bottom-3 left-16">
              <TiDelete className='text-red-700' />
            </button>
            <button
              onClick={() => handleChangeFloor(floor.id as string)}
              className={`${buttonClassName} 
              ${floor.id === selectedFloorId ? selectedButtonStyle : defaultButtonStyle}`}>
              {floor.name}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default FloorsList
