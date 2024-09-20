import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './HoroscopeDetail.module.scss'

interface HoroscopeDetailProps {
  description: string;
  onBack: () => void;
  isLoading?: boolean;
}

const HoroscopeDetail: React.FC<HoroscopeDetailProps> = ({ description, onBack, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className={s.component}>
      <div className={s.skeleton}>
        {
          isLoading
            ? <div className={s.loader}/>
            : <p>{description}</p>
        }
      </div>
      <button onClick={onBack}>{t('back')}</button>
    </div>
  );
};

export default HoroscopeDetail;

