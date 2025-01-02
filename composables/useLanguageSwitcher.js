export const useLanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  const languagesList = [
    {
      name: "O'zbekcha",
      code: "uz",
      flag: "/images/svg/flags/uz.svg",
      isStatus: true,
    },
    {
      name: "Қарақалпақша",
      code: "kr",
      flag: "/images/svg/flags/kr.svg",
      isStatus: false,
    },
    {
      name: "Кириллча",
      code: "uz-kr",
      flag: "/images/svg/flags/uz.svg",
      isStatus: false,
    },
    {
      name: "English",
      code: "en",
      flag: "/images/svg/flags/en.svg",
      isStatus: false,
    },
    {
      name: "Русский",
      code: "ru",
      flag: "/images/svg/flags/ru.svg",
      isStatus: false,
    },
  ];

  const currentLanguage = computed(() => languagesList.find((lang) => lang.code === locale.value));

  function changeLocale(_locale) {
    setLocale(_locale);
    locale.value = _locale;
  }

  return { currentLanguage, languagesList, changeLocale };
};
