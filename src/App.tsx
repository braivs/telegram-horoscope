// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import ZodiacCard from './components/ZodiacCard';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import { getHoroscope } from './services/api';
import aries from './icons/aries.png';
import taurus from './icons/taurus.png';
import gemini from './icons/gemini.png';
import cancer from './icons/cancer.png';
import leo from './icons/leo.png';
import virgo from './icons/virgo.png';
import libra from './icons/libra.png';
import scorpio from './icons/scorpio.png';
import sagittarius from './icons/sagittarius.png';
import capricorn from './icons/capricorn.png';
import aquarius from './icons/aquarius.png';
import pisces from './icons/pisces.png';
import HoroscopeDetail from "./components/HoroscopeDetail/HoroscopeDetail";

interface ZodiacSign {
  sign: string;
  period: string;
  icon: string;
}

const zodiacSigns: ZodiacSign[] = [
  { sign: 'aries', period: 'March 21 - April 19', icon: aries },
  { sign: 'taurus', period: 'April 20 - May 20', icon: taurus },
  { sign: 'gemini', period: 'May 21 - June 20', icon: gemini },
  { sign: 'cancer', period: 'June 21 - July 22', icon: cancer },
  { sign: 'leo', period: 'July 23 - August 22', icon: leo },
  { sign: 'virgo', period: 'August 23 - September 22', icon: virgo },
  { sign: 'libra', period: 'September 23 - October 22', icon: libra },
  { sign: 'scorpio', period: 'October 23 - November 21', icon: scorpio },
  { sign: 'sagittarius', period: 'November 22 - December 21', icon: sagittarius },
  { sign: 'capricorn', period: 'December 22 - January 19', icon: capricorn },
  { sign: 'aquarius', period: 'January 20 - February 18', icon: aquarius },
  { sign: 'pisces', period: 'February 19 - March 20', icon: pisces },
];

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentSign, setCurrentSign] = useState<string | null>(null);
  const [horoscope, setHoroscope] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Инициализация языка из localStorage или значения по умолчанию
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || i18n.language;
    i18n.changeLanguage(savedLanguage); // Устанавливаем сохранённый язык
  }, [i18n]);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Устанавливаем язык на основе данных из Telegram или localStorage
      const userLang = tg.initDataUnsafe.user?.language_code;
      const initialLang = userLang === 'ru' ? 'ru' : 'en';
      i18n.changeLanguage(localStorage.getItem('selectedLanguage') || initialLang);

      // Initially show "Close" button
      tg.BackButton.hide();

      const handleBackButton = () => setCurrentSign(null);

      if (currentSign) {
        tg.BackButton.show();
        tg.BackButton.onClick(handleBackButton);
      } else {
        tg.BackButton.offClick(handleBackButton);
      }

      // Cleanup
      return () => {
        tg.BackButton.hide();
        tg.BackButton.offClick(handleBackButton);
      };
    } else {
      // Устанавливаем язык на основе localStorage при отсутствии данных Telegram
      const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
      i18n.changeLanguage(savedLanguage); // Просто вызываем i18n.changeLanguage без setLanguage
    }
  }, [i18n, currentSign]);

  useEffect(() => {
    if (currentSign) {
      const fetchHoroscope = async () => {
        setHoroscope(''); // Clear previous description when a new sign is selected
        setLoading(true);
        const data = await getHoroscope(currentSign, i18n.language);
        setHoroscope(data?.description || 'No horoscope available');
        setLoading(false);
      };
      fetchHoroscope();
    }
  }, [currentSign, i18n.language]);

  const handleSignClick = (sign: string) => {
    setHoroscope('');
    setCurrentSign(sign);
  };

  // Сохранение языка при изменении
  useEffect(() => {
    localStorage.setItem('selectedLanguage', i18n.language);
  }, [i18n.language]);

  return (
    <div className="App">
      <LanguageSwitcher />
      {currentSign ? (
        <HoroscopeDetail
          description={horoscope}
          onBack={() => setCurrentSign(null)}
          isLoading={loading}
        />
      ) : (
        <div className="zodiac-list">
          {zodiacSigns.map(({ sign, period, icon }) => (
            <ZodiacCard
              key={sign}
              sign={sign}
              period={period}
              icon={icon}
              onClick={handleSignClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
