export const getHoroscope = async (
  _sign: string,
  _language: string
): Promise<{ description?: string }> => {
  const horoscopes = {
    en: {
      aries: "Stars don't care. Your day will be just as random as yesterday.",
      taurus: "No cosmic forces can help you; it’s just another ordinary day.",
      gemini: "Your sign says nothing. Do what you want, it’s all meaningless.",
      cancer: "No celestial intervention today. It’s all on you.",
      leo: "The universe isn’t impressed by you today. Good luck on your own.",
      virgo: "Stars have no plans for you, but go ahead and pretend they do.",
      libra: "Balance? Only if you make it happen. Stars aren’t involved.",
      scorpio: "Your intense nature? Stars don't notice. Carry on.",
      sagittarius: "Your adventure? Totally up to you. Stars are out of the loop.",
      capricorn: "Hard work will pay off—stars have nothing to do with it.",
      aquarius: "Your uniqueness isn’t written in the stars, just your actions.",
      pisces: "The stars are silent today. Your choices aren’t.",
    },
    ru: {
      aries: "Звёздам всё равно. Ваш день будет таким же случайным, как и вчера.",
      taurus: "Никакие космические силы не помогут вам; это просто обычный день.",
      gemini: "Ваш знак ничего не значит. Делайте, что хотите, всё бессмысленно.",
      cancer: "Сегодня никакого небесного вмешательства. Всё зависит только от вас.",
      leo: "Вселенная не впечатлена вами сегодня. Удачи самостоятельно.",
      virgo: "Звёзды не имеют планов на вас, но можете продолжать верить в это.",
      libra: "Баланс? Только если вы сами этого добьётесь. Звёзды ни при чём.",
      scorpio: "У вас интенсивная натура? Звёзды этого не замечают. Продолжайте личный путь.",
      sagittarius: "Ваши приключения? Только в ваших руках. Звёзды не в курсе.",
      capricorn: "Козерог: Труд окупится — звёзды тут ни при чём.",
      aquarius: "Водолей: Ваша уникальность не в звёздах, а в ваших поступках.",
      pisces: "Рыбы: Звёзды молчат сегодня. Ваши выборы — нет.",
    },
  };

  // Define a type for the valid signs
  type ZodiacSign = keyof typeof horoscopes['en'];

  // Check if the sign is valid
  const isZodiacSign = (sign: string): sign is ZodiacSign =>
    Object.keys(horoscopes.en).includes(sign);

  const language = _language === 'ru' ? 'ru' : 'en';
  const lowerCaseSign = _sign.toLowerCase();

  // Check if the sign is valid and return the corresponding horoscope
  const signHoroscope = isZodiacSign(lowerCaseSign)
    ? horoscopes[language][lowerCaseSign]
    : 'Horoscope not available';

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ description: signHoroscope });
    }, 500); // Simulates a 0.5 second delay
  });
};
