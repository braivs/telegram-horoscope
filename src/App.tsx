// src/App.tsx
import React, { useState, useEffect } from 'react';
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

  const handleBackClick = () => {
    setCurrentSign(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <LanguageSwitcher />
      </header>
      <main>
        {currentSign ? (
          <HoroscopeDetail description={horoscope} onBack={handleBackClick} />
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
