import { eq } from 'drizzle-orm'
import { recipeType } from '~~/shared/schema'
import { db } from '../../utils/db'

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? ''
  const result = await db
    .select()
    .from(recipeType)
    .where(
      eq(recipeType.id, id)
    )
    .limit(1)
    .then(value => value[0])

  return result
})
