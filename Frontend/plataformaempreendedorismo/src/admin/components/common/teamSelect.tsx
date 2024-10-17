import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";
import { useGetAllTeamsQuery } from "../../../api/studentApi";

interface TeamSelectProps {
  value: number | null
  onChange: (event: any) => void
  disable?: boolean
  className?: string
}


export const TeamSelect = ({ onChange, value, disable, className}: TeamSelectProps) => {
  const { data: teams, isLoading } = useGetAllTeamsQuery()

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>

  return (
    <FormControl className='sm:w-1/2 sm:pr-2' variant="outlined">
      <InputLabel id="team-select-label" className={`${value ? 'mt-2' : 'mt-0'}`}>Equipe</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="team-select-label"
        id="equipe"
        value={value || ''} // Valor atual selecionado
        onChange={onChange}
        label="Equipe"
        disabled={disable} // Desabilita se teamData já estiver preenchido
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px', // borda arredondada
            border: '1px solid #D1D5DB', // cor da borda
            padding: '5px 10px', // padding para ajustar
          },
          '& .MuiSelect-select': {
            paddingTop: '5px',
            paddingBottom: '5px',
            fontSize: '15px', // tamanho da fonte ajustado
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