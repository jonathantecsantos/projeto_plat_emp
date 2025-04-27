import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Institutions } from "../../../utils/types";

interface InstitutionsSelectProps {
  value: string;
  onChange: (event: any) => void;
  className?: string;
  disable?: boolean;
}

export const InstitutionsSelect = ({ onChange, value, className, disable }: InstitutionsSelectProps) => {

  return (
    <FormControl className="w-full" variant="outlined">
      <InputLabel id="institutionsSelect-types-select-label" sx={{ textAlign: 'center', }} >Instituição</InputLabel>
      <Select
        className={`${className ? className : 'py-1 mt-2 rounded-md'}`}
        labelId="institutionsSelect-types-select-label"
        id="institutionsSelect"
        value={value || ''}
        disabled={disable}
        onChange={onChange}
        label="Instituição"
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
        {Institutions.map((item, idx) => (
          <MenuItem key={idx} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
