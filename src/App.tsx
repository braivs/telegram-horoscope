import React, {useEffect, useState} from 'react'
import './App.css'
import {useTranslation} from 'react-i18next'
import ZodiacCard from './components/ZodiacCard'
import HoroscopeDetail from './components/HoroscopeDetail'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher'
import {getHoroscope} from './services/api'
import aries from './icons/aries.png'
import taurus from './icons/taurus.png'
import gemini from './icons/gemini.png'
import cancer from './icons/cancer.png'
import leo from './icons/leo.png'
import virgo from './icons/virgo.png'
import libra from './icons/libra.png'
import scorpio from './icons/scorpio.png'
import sagittarius from './icons/sagittarius.png'
import capricorn from './icons/capricorn.png'
import aquarius from './icons/aquarius.png'
import pisces from './icons/pisces.png'

interface ZodiacSign {
  sign: string;
  period: string;
  icon: string;
}

const zodiacSigns: ZodiacSign[] = [
  {sign: 'aries', period: 'March 21 - April 19', icon: aries},
  {sign: 'taurus', period: 'April 20 - May 20', icon: taurus},
  {sign: 'gemini', period: 'May 21 - June 20', icon: gemini},
  {sign: 'cancer', period: 'June 21 - July 22', icon: cancer},
  {sign: 'leo', period: 'July 23 - August 22', icon: leo},
  {sign: 'virgo', period: 'August 23 - September 22', icon: virgo},
  {sign: 'libra', period: 'September 23 - October 22', icon: libra},
  {sign: 'scorpio', period: 'October 23 - November 21', icon: scorpio},
  {sign: 'sagittarius', period: 'November 22 - December 21', icon: sagittarius},
  {sign: 'capricorn', period: 'December 22 - January 19', icon: capricorn},
  {sign: 'aquarius', period: 'January 20 - February 18', icon: aquarius},
  {sign: 'pisces', period: 'February 19 - March 20', icon: pisces},
]


const App: React.FC = () => {
  const {i18n} = useTranslation()
  const [currentSign, setCurrentSign] = useState<string | null>(null)
  const [horoscope, setHoroscope] = useState<string>('')
  const [language, setLanguage] = useState<string>(i18n.language)

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()

      // Расширяем приложение, чтобы получить доступ к данным Telegram
      tg.expand()

      // Получаем язык из Telegram и устанавливаем его в приложении
      const userLang = tg.initDataUnsafe.user?.language_code
      if (userLang === 'ru') {
        i18n.changeLanguage('ru')
        setLanguage('ru')
      } else {
        i18n.changeLanguage('en')
        setLanguage('en')
      }

      // Настраиваем кнопку "Назад"
      tg.BackButton.show()
      tg.BackButton.onClick(() => setCurrentSign(null))

      return () => {
        tg.BackButton.hide()
      }
    } else {
      // Локальный режим: Устанавливаем язык по умолчанию
      setLanguage('en')
      i18n.changeLanguage('en')
    }
  }, [i18n])

  useEffect(() => {
    if (currentSign) {
      (async () => {
        const data = await getHoroscope(currentSign, language)
        setHoroscope(data?.description || 'No horoscope available')
      })()
    }
  }, [currentSign, language])

  const handleSignClick = (sign: string) => {
    setCurrentSign(sign)
  }

  return (
    <div className="App">
      <LanguageSwitcher/>
      {currentSign ? (
        <HoroscopeDetail description={horoscope} onBack={() => setCurrentSign(null)}/>
      ) : (
        <div className="zodiac-list">
          {zodiacSigns.map(({sign, period, icon}) => (
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
  )
}

export default App
