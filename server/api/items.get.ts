import { items } from '~~/shared/schema'
import { db } from '../utils/db'

export default eventHandler(async (_) => {
  return await db.select().from(items)
})
