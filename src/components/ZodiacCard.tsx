// src/components/ZodiacCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ZodiacCardProps {
  sign: string;
  period: string;
  icon: string;
  onClick: (sign: string) => void;
}

const ZodiacCard: React.FC<ZodiacCardProps> = ({ sign, period, icon, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="zodiac-card" onClick={() => onClick(sign)}>
      <img src={icon} alt={`${t(`zodiac.${sign}`)} icon`} />
      <h3>{t(`zodiac.${sign}`)}</h3>
      <p>{period}</p>
    </div>
  );
};

export default ZodiacCard;
