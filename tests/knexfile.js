import { fileURLToPath } from 'url'

const url = new URL('../db/db.sqlite', import.meta.url)

const config = {
  client: 'sqlite3',
  connection: {
    filename: fileURLToPath(url)
  },
  useNullAsDefault: true
}

export default config
