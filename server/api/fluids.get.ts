import { fluids } from '~~/shared/schema'
import { db } from '../utils/db'

export default cachedEventHandler(async (_) => {
  return await db.select().from(fluids)
}, {
  maxAge: 60 * 60,
  name: 'fluids',
  getKey: _ => 'fluids'
})
