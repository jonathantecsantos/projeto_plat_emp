import { Slider, Typography } from "@mui/material";
import { SubcriterioAvaliacao } from "../../../model/evaluationFormat";

interface SubcriterionSliderProps {
  subcriterio: SubcriterioAvaliacao;
  value: number; 
  onChange: (id: number, value: number) => void;
}

export const SubcriterionSlider = ({ subcriterio, value, onChange }: SubcriterionSliderProps) => {

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const finalValue = newValue as number;
    onChange(subcriterio.id, finalValue);
  };

  return (
    <div className="">
      <Typography gutterBottom className="p-4 text-[#30168C]">
        {subcriterio.descricao}
      </Typography>
      <div className="p-4 sm:w-1/2 flex-col justify-center mx-auto ">
        <Slider
          style={{ color: "#65558F"}}
          size="medium"
          value={value || 0}
          max={subcriterio.notaMaxima}
          min={0}
          step={1}
          aria-label="medium"
          onChange={handleSliderChange}
          valueLabelDisplay="on"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0</span>
          <span>{subcriterio.notaMaxima}</span>
        </div>
      </div>
    </div>
  );
};
