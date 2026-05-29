import { routes } from '../../../shared/routing'

import styles from './search-form.module.css'

type SearchFormProps = {
  defaultValue: string
}

export const SearchForm = ({ defaultValue }: SearchFormProps) => {
  return (
    <form action={routes.search()} className={styles.form} method="get">
      <label className={styles.label} htmlFor="search-query">
        Search query
      </label>

      <div className={styles.controls}>
        <input
          className={styles.input}
          defaultValue={defaultValue}
          id="search-query"
          name="q"
          placeholder="Try xenomorph, platform, facehugger..."
          type="search"
        />

        <button className={styles.button} type="submit">
          Search
        </button>
      </div>
    </form>
  )
}
