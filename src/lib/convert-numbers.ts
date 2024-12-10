export const convertNumbers = (data: string): string | undefined => {
  const numbers: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '.': '.',
    '-': '-',
  };

  if (!data) return undefined; 
  let result = '';
  
  for (const char of data) {
    result += numbers[char] || char; 
  }

  return result;
};
