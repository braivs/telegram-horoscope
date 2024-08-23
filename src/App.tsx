import React, { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import ZodiacCard from './components/ZodiacCard';
import HoroscopeDetail from './components/HoroscopeDetail';
import LanguageSwitcher from './components/LanguageSwitcher';
import { getHoroscope } from './services/api';

interface ZodiacSign {
  sign: string;
  period: string;
  icon: string;
}

const zodiacSigns: ZodiacSign[] = [
  { sign: 'aries', period: 'March 21 - April 19', icon: 'icons/aries.png' },
  { sign: 'taurus', period: 'April 20 - May 20', icon: 'icons/taurus.png' },
  // ... другие знаки
];

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentSign, setCurrentSign] = useState<string | null>(null);
  const [horoscope, setHoroscope] = useState<string>('');
  const [language, setLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      // Расширяем приложение, чтобы получить доступ к данным Telegram
      tg.expand();

      // Получаем язык из Telegram и устанавливаем его в приложении
      const userLang = tg.initDataUnsafe.user?.language_code;
      if (userLang === 'ru') {
        i18n.changeLanguage('ru');
        setLanguage('ru');
      } else {
        i18n.changeLanguage('en');
        setLanguage('en');
      }

      // Настраиваем кнопку "Назад"
      tg.BackButton.show();
      tg.BackButton.onClick(() => setCurrentSign(null));

      return () => {
        tg.BackButton.hide();
      };
    } else {
      // Локальный режим: Устанавливаем язык по умолчанию
      setLanguage('en');
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  useEffect(() => {
    if (currentSign) {
      (async () => {
        const data = await getHoroscope(currentSign, language);
        setHoroscope(data?.description || 'No horoscope available');
      })();
    }
  }, [currentSign, language]);

  const handleSignClick = (sign: string) => {
    setCurrentSign(sign);
  };

  return (
    <div className="App">
      <header className="App-header">
        <LanguageSwitcher />
      </header>
      <main>
        {currentSign ? (
          <HoroscopeDetail description={horoscope} onBack={() => setCurrentSign(null)} />
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
      </main>
    </div>
  );
};

export default App;
