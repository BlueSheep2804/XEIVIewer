import { sql } from 'drizzle-orm'
import { tagsFluid } from '~~/shared/schema'

export default cachedEventHandler(async (event) => {
  const query = getQuery(event)
  if ('include_id' in query) {
    const includeId = query.include_id?.toString() ?? ''

    return await db
      .select()
      .from(tagsFluid)
      .where(
        sql`${includeId} = ANY(${tagsFluid.entry})`
      )
  }

  return await db.select().from(tagsFluid)
}, {
  maxAge: 60 * 60,
  name: 'tags_fluid',
  getKey: (event) => {
    const query = getQuery(event)
    if ('include_id' in query) {
      return query.include_id?.toString().replace(':', '_') ?? ''
    }
    return 'tags'
  }
})
