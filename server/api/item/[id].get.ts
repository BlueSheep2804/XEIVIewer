import { and, eq } from 'drizzle-orm'
import { items } from '~~/shared/schema'
import { db } from '../../utils/db'

export default eventHandler(async (event) => {
  const parsedResourceLocation = Identifier.parse(getRouterParam(event, 'id') ?? '')
  const result = await db
    .select()
    .from(items)
    .where(
      and(
        eq(items.namespace, parsedResourceLocation.namespace),
        eq(items.name, parsedResourceLocation.path)
      )
    )
    .limit(1)
    .then(value => value[0])

  return result
})
