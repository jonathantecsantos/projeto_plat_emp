import { ChangeEvent, useState } from "react";
import { defaultMB, inputClasses } from "../../../globals";

type TextAreaProps = {
  className?: string;
  placeholder?: string;
  showLabel?: boolean;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultMarginBotton?: boolean;
  value?: string;
  maxLength?: number;
};

export const TextAreaComponent = ({
  className,
  placeholder,
  onChange,
  label,
  showLabel,
  defaultMarginBotton,
  value,
  maxLength,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const currentLength = value ? value.length : 0;

  return (
    <div className="relative w-full">
      {showLabel && <label className="block text-sm leading-6">{label}</label>}
      <textarea
        className={`${inputClasses} ${className} ${defaultMarginBotton && defaultMB
          } min-h-[60px]`}
        placeholder={isFocused ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
      />
      {maxLength && (
        <div className="text-right text-xs mt-1 select-none opacity-75">
          {currentLength}/{maxLength} caracteres
        </div>
      )}
    </div>
  );
};
