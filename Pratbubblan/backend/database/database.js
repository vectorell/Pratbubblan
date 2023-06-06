import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export function getDb(filename, defaultData) {

    // 1. Hämta sökväg till fil
    const __dirname = dirname(fileURLToPath(import.meta.url))

    // 2. Koppla ihop sökvägen med själva filen
    const file = join(__dirname, filename)

    // 3. Koppla ihop filen med lowdb
    const adapter = new JSONFile(file)

    // 4. Plugga in adaptern i lowdb
    const db = new Low(adapter, defaultData)

    // 5. Returnera databasen
    return db
}