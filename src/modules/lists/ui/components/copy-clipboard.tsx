import { FC, useState } from 'react';
import { copyToClipboard } from '../../utils/copy-clipboard';

interface CopyToClipboardProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export const CopyToClipboard: FC<CopyToClipboardProps> = ({
  text,
  className = '',
  children
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={className}
      title="Copiar al portapapeles"
    >
      {children || (copied ? 'Copiado!' : 'Copiar')}
    </button>
  );
};
