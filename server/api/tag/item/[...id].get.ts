import { and, eq } from 'drizzle-orm'
import { tagsItem } from '~~/shared/schema'

export default eventHandler(async (event) => {
  const parsedResourceLocation = Identifier.parse(getRouterParam(event, 'id') ?? '')
  const result = await db
    .select()
    .from(tagsItem)
    .where(
      and(
        eq(tagsItem.namespace, parsedResourceLocation.namespace),
        eq(tagsItem.path, parsedResourceLocation.path)
      )
    )
    .limit(1)
    .then(value => value[0])

  return result
})
