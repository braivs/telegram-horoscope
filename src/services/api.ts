// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://poker247tech.ru/get_horoscope/'; // замените на фактический URL API

export const getHoroscope = async (sign: string, language: string = 'en') => {
  const languageParam = language === 'ru' ? 'original' : 'translated';
  try {
    const response = await axios.post(API_URL, {
      sign,
      language: languageParam,
      period: 'today',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    return null;
  }
};
