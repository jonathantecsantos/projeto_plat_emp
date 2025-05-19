import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material"
import { useGetOdsQuery } from "../../../api/studentApi"
import { useMemo } from "react"

interface OdsSelectProps {
  value: number[]
  onChange: (event: any) => void
  className?: string
  disable?: boolean
}

export const OdsSelect = ({ onChange, value, className, disable }: OdsSelectProps) => {
  const { data: ods, isLoading } = useGetOdsQuery()

  const sortedById = useMemo(() => {
    if (!ods) return []
    return [...ods].sort((a, b) => a.id - b.id)
  }, [ods])

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>

  return (
    <FormControl className='w-full' variant="outlined">
      <InputLabel id="ODS-select-label" sx={{ textAlign: 'center' }}>ODS</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="ODS-select-label"
        id="ODS"
        multiple
        value={value || ''}
        disabled={disable}
        onChange={onChange}
        renderValue={(selected) =>
          (selected as number[])
            .map(id => {
              const o = sortedById.find(item => item.id === id)
              return o ? `${o.codigo} - ${o.descricao}` : ""
            })
            .join(", ")
        }
        label="ODS"
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
            boxSizing: 'border-box',
          },
          '& .MuiSelect-select': {
            paddingTop: '5px',
            paddingBottom: '5px',
            fontSize: '15px',
            boxSizing: 'border-box',
          },
        }}
      >
       {
          sortedById.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.codigo} - {item.descricao}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}