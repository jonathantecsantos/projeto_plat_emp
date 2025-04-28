import { LinearProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useGetTeachersQuery } from "../../../api/studentApi"

interface TeacherSelectProps {
  value: number | null
  onChange: (event: any) => void
  className?: string
}

export const TeacherSelect = ({ onChange, value, className }: TeacherSelectProps) => {
  const { data: teachers, isLoading } = useGetTeachersQuery()

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" /></div>

  return (
    <FormControl className='w-full' variant="outlined">
      <InputLabel id="teacher-select-label" sx={{ textAlign: 'center' }} >Professor</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="teacher-select-label"
        id="Professor"
        value={value || ''}
        onChange={onChange}
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
        label="Professor"
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
        {teachers?.map((teacher) => (
          <MenuItem key={teacher.id} value={teacher.id}>
            {teacher.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}