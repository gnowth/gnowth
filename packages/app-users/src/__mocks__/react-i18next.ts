export const useTranslation = () => ({
  i18n: { changeLanguage: () => new Promise(() => undefined) },
  t: (str: string) => str,
})
