import { sql } from 'drizzle-orm'
import { tagsItem } from '~~/shared/schema'

export default cachedEventHandler(async (event) => {
  const query = getQuery(event)
  if ('include_id' in query) {
    const includeId = query.include_id?.toString() ?? ''

    return await db
      .select()
      .from(tagsItem)
      .where(
        sql`${includeId} = ANY(${tagsItem.entry})`
      )
  }

  return await db.select().from(tagsItem)
}, {
  maxAge: 60 * 60,
  name: 'tags_item',
  getKey: (event) => {
    const query = getQuery(event)
    if ('include_id' in query) {
      return query.include_id?.toString().replace(':', '_') ?? ''
    }
    return 'tags'
  }
})
