import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface LoadingButtonProps {
  loading: boolean;
  success: boolean;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const LoadingButton = ({ loading, success, onClick, disabled, children }: LoadingButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white flex items-center space-x-2 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      style={{ textTransform: 'none', background: loading ? '#8668FFCC' : '#8668FF' }}
    >
      {loading && <CircularProgress size={20} />}
      {success && !loading && <CheckCircleIcon style={{ color: 'green' }} />}
      {!loading && children}
    </button>
  );
};

export default LoadingButton;
