import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ActivityTypes } from "../../../utils/types";

interface ActivityTypesSelectProps {
  value: string[];
  onChange: (event: any) => void;
  className?: string;
  disable?: boolean;
}

export const ActivityTypesSelect = ({ onChange, value, className, disable }: ActivityTypesSelectProps) => {

  return (
    <FormControl className="w-full" variant="outlined">
      <InputLabel id="activity-types-select-label" sx={{ textAlign: 'center', }} >Tipos de Atividade</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="activity-types-select-label"
        id="activityTypes"
        multiple
        value={value || []}
        disabled={disable}
        onChange={onChange}
        renderValue={(selected) => {
          return selected.map((type: string) => {
            const activity = ActivityTypes.find(item => item.value === type);
            return activity ? activity.label : '';
          }).join(', ');
        }}
        label="Tipos de Atividade"
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
        {ActivityTypes.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
