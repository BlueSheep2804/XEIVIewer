import { eq } from 'drizzle-orm'
import { ingredientTable } from '~~/shared/schema'
import { db } from '#server/utils/db'

export default cachedEventHandler(async (event) => {
  const ingredientType = getRouterParam(event, 'type') ?? ''
  return await db
    .select()
    .from(ingredientTable)
    .where(eq(ingredientTable.type, ingredientType))
}, {
  maxAge: 60 * 60,
  name: 'ingredient',
  getKey: event => getRouterParam(event, 'type') ?? ''
})
