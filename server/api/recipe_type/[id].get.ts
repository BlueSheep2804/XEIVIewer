import { eq } from 'drizzle-orm'
import { recipeType } from '~~/shared/schema'
import { db } from '../../utils/db'

export default cachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? ''
  const result = await db
    .select()
    .from(recipeType)
    .where(
      eq(recipeType.id, id)
    )
    .limit(1)
    .then(value => value[0])

  return result
}, {
  maxAge: 60 * 60,
  name: 'recipe_type',
  getKey: event => getRouterParam(event, 'id')?.replace(':', '_') ?? ''
})
