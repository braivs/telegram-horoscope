// src/components/HoroscopeDetail.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HoroscopeDetailProps {
  description: string;
  onBack: () => void;
}

const HoroscopeDetail: React.FC<HoroscopeDetailProps> = ({ description, onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="horoscope-detail">
      <p>{description}</p>
      <button onClick={onBack}>{t('back')}</button>
    </div>
  );
};

export default HoroscopeDetail;
