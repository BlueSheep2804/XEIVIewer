import { eq } from 'drizzle-orm'
import { recipes } from '~~/shared/schema'
import { db } from '../../utils/db'

export default cachedEventHandler(async (event) => {
  const type = getRouterParam(event, 'type') ?? ''
  const result = await db
    .select()
    .from(recipes)
    .where(
      eq(recipes.type, type)
    )

  return result
}, {
  maxAge: 60 * 60,
  name: 'recipes',
  getKey: event => getRouterParam(event, 'type')?.replace(':', '_')?.replaceAll('/', '_') ?? ''
})
