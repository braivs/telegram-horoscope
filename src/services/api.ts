// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://poker247tech.ru/get_horoscope/';

export const getHoroscope = async (sign: string, language: string): Promise<{ description?: string }> => {
  try {
    const response = await axios.post(API_URL, {
      sign: sign,
      language: language === 'ru' ? 'original' : 'translated',
      period: 'today',
    });

    console.log('API response:', response.data); // Выводим ответ от API

    // Извлекаем описание из правильного поля
    if (response.data && response.data.horoscope) {
      return { description: response.data.horoscope };
    } else {
      return { description: 'No horoscope available' }; // Если нет данных, возвращаем сообщение
    }
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    return { description: 'No horoscope available' }; // В случае ошибки возвращаем сообщение
  }
};
