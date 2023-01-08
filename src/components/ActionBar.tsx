import { BsPatchPlus } from 'react-icons/bs'
import { BiReset } from 'react-icons/bi'

interface Props {
  onClickAddTable: () => void
  onClickResetFloor: () => void
  onClickAddFloor: () => void
}
const ActionBar = (props: Props) => {
  const { onClickAddTable, onClickAddFloor, onClickResetFloor } = props
  const classNameAddFloor = `bg-slate-700 text-white rounded-2xl text-sm py-1 px-2`
  const classNameResetFloor = `bg-slate-700 text-white rounded-2xl text-sm py-1 px-2`
  const classNameAddTable = `bg-slate-700 text-white rounded-2xl text-sm py-1 px-2`
  const flexStyle = `flex place-items-center gap-1`
  return (
    <div className="flex flex-col p-1 gap-3">
      <button onClick={onClickAddTable} className={`${classNameAddFloor} ${flexStyle}`}>
        <BsPatchPlus />
        <span>Add table</span>
      </button>
      <button onClick={onClickAddFloor} className={`${classNameAddTable} ${flexStyle}`}>
        <BsPatchPlus />
        <span>Add floor</span>
      </button>
      <button onClick={onClickResetFloor} className={`${classNameResetFloor} ${flexStyle}`}>
        <BiReset />
        <span>Reset floor</span>
      </button>
    </div>
  )
}
export default ActionBar