export const getHoroscope = async (_sign: string, _language: string): Promise<{ description?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' });
    }, 500); // Simulates a 0.5 second delay
  });
};