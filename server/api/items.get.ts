import { items } from '~~/shared/schema'
import { db } from '../utils/db'

export default cachedEventHandler(async (_) => {
  return await db.select().from(items)
}, {
  maxAge: 60 * 60,
  name: 'items',
  getKey: _ => 'items'
})
