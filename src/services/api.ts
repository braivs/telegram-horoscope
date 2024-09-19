// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://api.prokerala.com/v2/astrology/horoscope/daily';

export const getHoroscope = async (sign: string, language: string): Promise<{ description?: string }> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        sign: sign,
        timezone: 'UTC',  // Adjust this if needed
        date: new Date().toISOString().split('T')[0]  // Getting today's date in YYYY-MM-DD format
      },
      headers: {
        'Authorization': 'PaoiN8pxu48VZTuZhoxQqTyen8rkzXajfcmWXpEu', // Replace with your actual API key from Prokerala
        'Accept-Language': language === 'ru' ? 'ru' : 'en' // Set language header
      }
    });

    console.log('API response:', response.data); // Log the API response for debugging

    // Check if the response contains the horoscope
    if (response.data && response.data.data && response.data.data.horoscope) {
      return { description: response.data.data.horoscope };
    } else {
      return { description: 'No horoscope available' }; // Fallback message in case of missing data
    }
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    return { description: 'No horoscope available' }; // Fallback message in case of error
  }
};
