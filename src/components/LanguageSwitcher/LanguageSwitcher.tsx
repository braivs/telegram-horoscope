import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './LanguageSwitcher.module.scss'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className={s.component}>
      <label htmlFor="language-select" className={s.label}>
        {i18n.t('language')}:
      </label>
      <select id="language-select" onChange={handleLanguageChange} value={i18n.language}>
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
