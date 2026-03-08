import { and, eq } from 'drizzle-orm'
import { recipes, recipeType } from '~~/shared/schema'
import { db } from '../../utils/db'

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? ''
  const parsedResourceLocation = Identifier.parse(id)
  const result = await db
    .select()
    .from(recipes)
    .leftJoin(recipeType, eq(recipes.type, recipeType.id))
    .where(
      and(
        eq(recipes.namespace, parsedResourceLocation.namespace),
        eq(recipes.path, parsedResourceLocation.path)
      )
    )
    .limit(1)
    .then(value => value[0])

  return result
})
