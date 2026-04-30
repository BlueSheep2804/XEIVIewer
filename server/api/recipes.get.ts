import { recipes } from '~~/shared/schema'
import { db } from '../utils/db'
import { sql } from 'drizzle-orm'

export default cachedEventHandler(async (event) => {
  const query = getQuery(event)
  if ('input' in query && typeof query.input === 'string') {
    const ingredient = parseIngredientValue(query.input)
    const tags = await $fetch(`/api/tag/${ingredient.type}?include=${ingredient.entry.full}`)
    const accept = [
      ingredient.entry.full,
      ...mapTags(tags)
    ]
    return await db
      .select()
      .from(recipes)
      .where(
        sql`${recipes.input} @? '$[*][*] ? (
          @.type == ${sql.identifier(ingredient.type)}
          && @.entry like_regex ${sql.identifier(`^(${accept.join('|')})$`)}
        )'`
      )
  } else if ('output' in query && typeof query.output === 'string') {
    const ingredient = parseIngredientValue(query.output)
    console.log(ingredient.type)
    return await db
      .select()
      .from(recipes)
      .where(
        sql`${recipes.output} @? ${
          sql`'$[*][*] ? (
            @.type == ${sql.identifier(ingredient.type)}
            && @.entry == ${sql.identifier(ingredient.entry.full)}
          )'`
        }`
      )
  }
  throw createError({
    status: 500
  })
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

function mapTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map((value) => {
      if (isPartialTag(value)) {
        return `#${value.namespace}:${value.path}`
      } else return ''
    })
  }
  return []
}

type PartialTag = {
  namespace: string
  path: string
}

function isPartialTag(value: unknown): value is PartialTag {
  return (
    value !== null
    && typeof value === 'object'
    && 'namespace' in value
    && typeof value.namespace === 'string'
    && 'path' in value
    && typeof value.path === 'string'
  )
}
