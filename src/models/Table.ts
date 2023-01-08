import { Position } from './Position'
import { Floor } from './Floor'

export interface Table {
  id?: string
  name: string
  position?: Position
  floorId?: string
  floor?: Floor
}
