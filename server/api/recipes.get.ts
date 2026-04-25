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
          sql`${ingredient.entry.full} = ANY(entry)`
        )
      const accept = [
        ingredient.entry.full,
        ...tags.map(value => `#${value.namespace}:${value.path}`)
      ]
      return await db
        .select()
        .from(recipes)
        .where(
          sql`${recipes.input} @? '$[*][*] ? (
            @.type == ${sql.identifier(ingredient.type.full)}
            && @.entry like_regex ${sql.identifier(`^(${accept.join('|')})$`)}
          )'`
        )
    }
  } else if ('output' in query && typeof query.output === 'string') {
    const ingredient = parseIngredientValue(query.output)
    return await db
      .select()
      .from(recipes)
      .where(
        sql`${recipes.output} @? ${
          sql`'$[*][*] ? (
            @.type == ${sql.identifier(ingredient.type.full)}
            && @.entry == ${sql.identifier(ingredient.entry.full)}
          )'`
        }`
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
  },
  shouldBypassCache: () => true
})
