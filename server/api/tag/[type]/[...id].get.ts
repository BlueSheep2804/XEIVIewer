import { and, eq } from 'drizzle-orm'
import { tagTable } from '~~/shared/schema'

export default cachedEventHandler(async (event) => {
  const type = getRouterParam(event, 'type')
  const id = Identifier.parse(getRouterParam(event, 'id') ?? '')

  if (typeof type === 'undefined') {
    throw createError({
      status: 500
    })
  }

  return await db
    .select()
    .from(tagTable)
    .where(
      and(
        eq(tagTable.type, type),
        eq(tagTable.namespace, id.namespace),
        eq(tagTable.path, id.path)
      )
    )
    .limit(1)
    .then(value => value[0])
}, {
  maxAge: 60 * 60,
  name: 'tags'
})
