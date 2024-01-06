export const getInitials = (string: string | undefined): string => {
  if (string !== undefined) {
    return string
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), '');
  }
  
  return ''; 
};
