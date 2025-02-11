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
};

export const TextAreaComponent = ({
  className,
  placeholder,
  onChange,
  label,
  showLabel,
  defaultMarginBotton,
  value,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {showLabel && <label className="block text-sm leading-6">{label}</label>}
      <textarea
        className={`${inputClasses} ${className} ${defaultMarginBotton && defaultMB
          } min-h-[60px]`}
        placeholder={isFocused ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
