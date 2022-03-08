import { useTranslation } from 'react-i18next'
import LayoutSection from '../components/layout-section'

function FormTeam() {
  const { t } = useTranslation()

  return (
    <LayoutSection>
      <form>{t('Form team')}</form>
    </LayoutSection>
  )
}

export default FormTeam
