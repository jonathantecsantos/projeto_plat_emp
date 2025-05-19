import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material"
import { useGetActivityTypesQuery } from "../../../api/studentApi"
import { useMemo } from "react"

interface ActivityTypesSelectProps {
  value: number[]
  onChange: (event: any) => void
  className?: string
  disable?: boolean
}

export const ActivityTypesSelect = ({ onChange, value, className, disable }: ActivityTypesSelectProps) => {
  const { data: activityTypes, isLoading } = useGetActivityTypesQuery()

  const sortedActivityTypes = useMemo(() => {
    if (!activityTypes) return []
    return [...activityTypes].sort((a, b) => a.id - b.id)
  }, [activityTypes])

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>

  return (
    <FormControl className="w-full" variant="outlined">
      <InputLabel id="activity-types-select-label" sx={{ textAlign: 'center', }} >Tipos de Atividade</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md '}`}
        labelId="activity-types-select-label"
        id="activityTypes"
        multiple
        value={value || []}
        disabled={disable}
        onChange={onChange}
        renderValue={(selected) => (
          (selected as number[])
            .map(id => {
              const act = sortedActivityTypes.find(item => item.id === id)
              return act ? act.descricao : ''
            })
            .join(', ')
        )}
        label="Tipos de Atividade"
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: '#D1E8FF', // Cor de fundo para itens selecionados
                '&:hover': {
                  backgroundColor: '#A8D1FF', // Cor ao passar o mouse sobre itens selecionados
                },
              },
            },
          },
        }}
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
        {
          sortedActivityTypes.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.descricao}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}
