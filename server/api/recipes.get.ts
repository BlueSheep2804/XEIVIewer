import { recipes } from '~~/shared/schema'
import { db } from '../utils/db'
import { sql } from 'drizzle-orm'

export default cachedEventHandler(async (event) => {
  const query = getQuery(event)
  if ('input' in query && typeof query.input === 'string') {
    const ingredient = parseIngredientValue(query.input)
    const table = registryTags[ingredient.type.simple]
    if (typeof table !== 'undefined') {
      const tags = await db
        .select({ namespace: sql`namespace`, path: sql`path` })
        .from(table)
        .where(
          sql`${ingredient.value.full} = ANY(entry)`
        )
      const accept = [
        query.input,
        ...tags.map(value => `#${ingredient.type.simple};${value.namespace}:${value.path}`)
      ]
      return await db
        .select()
        .from(recipes)
        .where(
          sql`exists (
            select 1 from unnest(${recipes.input}) as element
            where element ILIKE ANY(ARRAY[${sql.join(accept.map(value => `%${value}`), sql`, `)}])
          )`
        )
    }
  } else if ('output' in query && typeof query.output === 'string') {
    return await db
      .select()
      .from(recipes)
      .where(
        sql`${query.output} = ANY(${recipes.output})`
      )
  } else {
    throw createError({
      status: 500
    })
  }
}, {
  maxAge: 60 * 60,
  name: 'recipes',
  getKey: (event) => {
    const query = getQuery(event)
    if ('input' in query && typeof query.input === 'string') {
      return `input_${query.input.replaceAll(/[;:]/g, '_')}`
    } else if ('output' in query && typeof query.output === 'string') {
      return `output_${query.output.replaceAll(/[;:]/g, '_')}`
    }
    return 'recipes'
  }
})
