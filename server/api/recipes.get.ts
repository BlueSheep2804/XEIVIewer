import { recipes } from '~~/shared/schema'
import { db } from '../utils/db'

export default cachedEventHandler(async (_) => {
  return await db.select().from(recipes)
}, {
  maxAge: 60 * 60,
  name: 'recipes',
  getKey: _ => 'recipes'
})
