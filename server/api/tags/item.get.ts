import { tagsItem } from '~~/shared/schema'

export default eventHandler(async (_) => {
  return await db.select().from(tagsItem)
})
