import { sql } from 'drizzle-orm'
import { tagsItem } from '~~/shared/schema'

export default eventHandler(async (event) => {
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
})
