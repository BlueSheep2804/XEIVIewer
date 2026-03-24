import { recipeType } from '~~/shared/schema'
import { db } from '../utils/db'

export default cachedEventHandler(async (_) => {
  return await db.select().from(recipeType)
}, {
  maxAge: 60 * 60,
  name: 'recipe_types',
  getKey: _ => 'recipe_types'
})
