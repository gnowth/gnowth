export const useTranslation = () => ({
  t: (str: string) => str,
  i18n: { changeLanguage: () => new Promise(() => undefined) },
})
