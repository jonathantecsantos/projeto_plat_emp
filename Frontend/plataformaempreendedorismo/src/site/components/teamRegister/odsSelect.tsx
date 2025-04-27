import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material"
import { useGetOdsQuery } from "../../../api/studentApi"

interface OdsSelectProps {
  value: number[]
  onChange: (event: any) => void
  className?: string
  disable?: boolean
}

export const OdsSelect = ({ onChange, value, className, disable }: OdsSelectProps) => {
  const { data: ods, isLoading } = useGetOdsQuery()

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>


  return (
    <FormControl className='w-full' variant="outlined">
      <InputLabel id="ODS-select-label" sx={{ textAlign: 'center' }} >ODS</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="ODS-select-label"
        id="ODS"
        multiple
        value={value || ''}
        disabled={disable}
        onChange={onChange}
        renderValue={(selected) => {
          return selected.map((id: number) => {
            const odsItem = ods?.find(item => item.id === id); // Encontrando o item ODS com o ID correspondente
            return odsItem ? odsItem.descricao : '';
          }).join(', ');
        }}
        label="ODS"
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
          }
        }}
      >
        {ods?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.descricao}
          </MenuItem>

        ))}
      </Select>
    </FormControl>
  )
}