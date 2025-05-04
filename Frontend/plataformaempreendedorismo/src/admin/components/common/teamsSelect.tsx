import { LinearProgress, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { useGetAllTeamsQuery } from "../../../api/studentApi"

interface TeamSelectProps {
  value: number[]
  onChange: (teamIds: number[]) => void
  disable?: boolean
  className?: string
}

export const TeamsSelect = ({ onChange, value, disable, className }: TeamSelectProps) => {
  const { data: teams, isLoading } = useGetAllTeamsQuery()

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    // O Material-UI já retorna o array de valores selecionados
    onChange(event.target.value as number[])
  }

  return (
    <FormControl className='sm:w-1/2 sm:pr-2' variant="outlined">
      <InputLabel id="team-select-label">Equipes</InputLabel>
      <Select
        className={className}
        labelId="team-select-label"
        id="equipes"
        multiple
        value={value}
        onChange={handleChange}
        label="Equipe"
        disabled={disable}
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