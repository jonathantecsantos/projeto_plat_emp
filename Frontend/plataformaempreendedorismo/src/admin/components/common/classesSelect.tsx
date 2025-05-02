import { ChangeEvent } from "react"
import { ClassesSelectTypes } from "../../../utils/types"

interface ClassesSelectTypes {
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

export const ClassesSelect = ({ onChange, value, className }: ClassesSelectTypes) => {
  return <div>
    <label htmlFor="turma" className={`${className ? className : 'block text-nowrap text-sm font-medium text-gray-700'}`}>Turma/Série</label>
    <select
      value={value || ''}
      onChange={onChange}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">Turma</option>
      {Object.values(ClassesSelectTypes).map((turma) => (
        <option key={turma} value={turma}>{turma}</option>
      ))}
    </select>
  </div>
}