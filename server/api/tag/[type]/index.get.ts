import { and, eq, sql } from 'drizzle-orm'
import { tagTable } from '~~/shared/schema'

export default cachedEventHandler(async (event) => {
  const type = getRouterParam(event, 'type')
  const query = getQuery(event)

  if (typeof type === 'undefined') {
    throw createError({
      status: 500
    })
  }

  if ('include' in query) {
    const includeId = query.include?.toString() ?? ''

    return await db
      .select()
      .from(tagTable)
      .where(
        and(
          eq(tagTable.type, type),
          sql`${includeId} = ANY(${tagTable.entry})`
        )
      )
  }

  return await db.select().from(tagTable).where(eq(tagTable.type, type))
}, {
  maxAge: 60 * 60,
  name: 'tags'
})
