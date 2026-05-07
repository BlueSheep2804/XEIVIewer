import { ingredientType } from '~~/shared/schema'
import { db } from '#server/utils/db'

export default cachedEventHandler(async (_) => {
  return await db
    .select()
    .from(ingredientType)
}, {
  maxAge: 60 * 60,
  name: 'ingredientTypes'
})
