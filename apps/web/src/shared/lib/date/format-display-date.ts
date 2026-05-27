import type { DateISOString } from '@thematic-content-platform/content-domain'

import { DEFAULT_LOCALE, type AppLocale } from '../../config/i18n'

type FormatDisplayDateOptions = {
  locale?: AppLocale
}

export const formatDisplayDate = (
  dateISOString: DateISOString,
  options: FormatDisplayDateOptions = {},
): string => {
  const locale = options.locale ?? DEFAULT_LOCALE

  return new Date(dateISOString).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
