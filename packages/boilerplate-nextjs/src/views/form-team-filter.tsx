import { useTranslation } from 'react-i18next'

import LayoutSection from '../components/layout-section'

function FormTeamFilter() {
  const { t } = useTranslation()

  return (
    <LayoutSection>
      <form>{t('Team filter')}</form>
    </LayoutSection>
  )
}

export default FormTeamFilter
