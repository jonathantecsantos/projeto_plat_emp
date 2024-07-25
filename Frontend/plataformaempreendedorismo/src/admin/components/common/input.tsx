import PercentIcon from '@mui/icons-material/Percent'
import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton, TextFieldProps, inputClasses } from '@mui/material'
import { ChangeEvent, MouseEventHandler, useState } from 'react'
import { defaultMB } from '../../../globals'

type SearchInputPropsBase = {
  onIconClick?: MouseEventHandler<HTMLButtonElement> | undefined,
  className?: string,
  type?: string,
  placeholder?: string,
  showSearchIcon?: boolean,
  showIconPercent?: boolean,
  showLabel?: boolean,
  label?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  defaultMarginBotton?: boolean,
  value?: string | number | readonly string[] | undefined
}
type SearchInputProps = SearchInputPropsBase & TextFieldProps

export const InputComponent = ({ onIconClick, className, type, placeholder, showSearchIcon,
  onChange, showIconPercent, label, showLabel, defaultMarginBotton, value }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }
  return <div className='relative'>
    {showLabel && <label className="block text-sm leading-6">{label}</label>}
    <input className={`${inputClasses} ${className} ${defaultMarginBotton && defaultMB}`}
      type={type}
      placeholder={isFocused ? placeholder : ''}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={onChange}
      value={value}
    />
    {showSearchIcon && <IconButton onClick={onIconClick}
      className={`absolute inset-y-0 right-0 flex justify-start max-w-fit
      ${showLabel && `mt-6`} `}>
      <SearchIcon className='text-slate-600/70 h-5 hover:text-ring-custom' />
    </IconButton>}

    {showIconPercent && <span className='absolute inset-y-0 right-0 flex items-center px-2 mb-1'>
      <Box sx={{
        '& .css-ahj2mt-MuiTypography-root': {
          fontSize: '0.875rem',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '0.875rem',
        },
      }}>
        <PercentIcon className='text-slate-700/90 ' />
      </Box>
    </span>}
  </div>

} 