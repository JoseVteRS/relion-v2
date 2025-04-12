export const copyToClipboard = async (text: string): Promise<boolean> => {

  if (!text) {
    throw new Error(`Text is required`);
  }

  if (typeof text !== 'string') {
    throw new Error(`Text must be a string, got ${typeof text}`);
  }

  if (text.length === 0 || text.trim() === '') {
    throw new Error(`Text must not be empty`);
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback para navegadores más antiguos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (err) {
        textArea.remove();
        return false;
      }
    }
  } catch (err) {
    return false;
  }
};
