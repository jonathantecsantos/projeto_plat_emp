import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";
import { useGetInstitutionsQuery } from "../../../api/studentApi";

interface InstitutionsSelectProps {
  value: number[]
  onChange: (event: any) => void;
  className?: string;
  disable?: boolean;
}

export const InstitutionsSelect = ({ onChange, value, className, disable }: InstitutionsSelectProps) => {
  const { data: institutions, isLoading } = useGetInstitutionsQuery()

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>

  return (
    <FormControl className="w-full" variant="outlined">
      <InputLabel id="institutionsSelect-types-select-label" sx={{ textAlign: 'center', }}>
        Instituição de Impacto Social</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="institutionsSelect-types-select-label"
        id="institutionsSelect"
        multiple
        value={value || ''}
        disabled={disable}
        onChange={onChange}
        label="Instituição"
        // renderValue={(selected) => {
        //   return selected.map((id: number) => {
        //     const activity = institutions?.find(item => item.id === id)
        //     return activity ? activity.descricao : ''
        //   }).join(', ')
        // }}
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
        {institutions?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.descricao}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
