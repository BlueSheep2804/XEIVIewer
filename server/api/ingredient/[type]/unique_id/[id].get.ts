import { and, eq } from 'drizzle-orm'
import { ingredientTable } from '~~/shared/schema'
import { db } from '#server/utils/db'

export default cachedEventHandler(async (event) => {
  const ingredientType = getRouterParam(event, 'type') ?? ''
  const id = getRouterParam(event, 'id', { decode: true }) ?? ''
  console.log(id)
  const result = await db
    .select()
    .from(ingredientTable)
    .where(
      and(
        eq(ingredientTable.type, ingredientType),
        eq(ingredientTable.uniqueId, id)
      )
    )
    .limit(1)
    .then(value => value[0])

  return result
}, {
  maxAge: 60 * 60,
  name: 'ingredient'
  // getKey: event => getRouterParam(event, 'id')?.replace(':', '_') ?? ''
})
