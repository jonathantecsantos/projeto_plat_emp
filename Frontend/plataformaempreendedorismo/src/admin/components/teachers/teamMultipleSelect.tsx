import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material"
import { useGetAllTeamsQuery } from "../../../api/studentApi"

interface TeamMultipleSelectProps {
  value: number[] // Aceitar múltiplos valores
  onChange: (event: number[]) => void
  disable?: boolean
  className?: string
}

export const TeamMultipleSelect = ({ onChange, value, disable, className }: TeamMultipleSelectProps) => {
  const { data: teams, isLoading } = useGetAllTeamsQuery()

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>
  //TODO winnicius fix edit teacher component

  return (
    <FormControl className='sm:w-1/2 sm:pr-2' variant="outlined">
      <InputLabel id="team-multiple-select-label" className={`${value.length ? 'mt-2' : 'mt-0'}`}>Equipes</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="team-multiple-select-label"
        id="equipes"
        multiple // Permitir seleção múltipla
        value={value} // Valor atual selecionado
        onChange={(e) => onChange(e.target.value as number[])} // Converter para array de números
        label="Equipes"
        disabled={disable} // Desabilita se necessário
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            border: '1px solid #D1D5DB',
            padding: '5px 10px',
          },
          '& .MuiSelect-select': {
            paddingTop: '5px',
            paddingBottom: '5px',
            fontSize: '15px',
          }
        }}
      >
        {teams?.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            {team.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}