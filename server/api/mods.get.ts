import { mods } from '~~/shared/schema'
import { db } from '../utils/db'

export default eventHandler(async (_) => {
  return await db.select().from(mods)
})
