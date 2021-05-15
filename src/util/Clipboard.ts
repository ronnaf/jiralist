import { toast } from 'react-toastify';

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  toast.success('copied!');
};
