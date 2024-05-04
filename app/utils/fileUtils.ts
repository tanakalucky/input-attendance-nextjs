const units = ['Byte', 'KB', 'MB', 'GB'] as const;

export function getFileSizeWithUnit(size: number, floating: number = 1): [number, string] | [] {
  for (let i = 0; i < units.length; i += 1) {
    if (size < 1024 ** (i + 1)) {
      const floatingBase = 10 ** floating;
      const num = Math.ceil((size * floatingBase) / Math.max(1, 1024 ** i)) / floatingBase;
      return [num, units[i]];
    }
  }
  return [];
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      // Remove the data URL prefix
      const base64Data = reader.result as string;
      const base64String = base64Data.split(',')[1];
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
