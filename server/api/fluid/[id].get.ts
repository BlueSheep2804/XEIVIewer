import { and, eq } from 'drizzle-orm'
import { fluids } from '~~/shared/schema'
import { db } from '../../utils/db'

export default cachedEventHandler(async (event) => {
  const parsedResourceLocation = Identifier.parse(getRouterParam(event, 'id') ?? '')
  const result = await db
    .select()
    .from(fluids)
    .where(
      and(
        eq(fluids.namespace, parsedResourceLocation.namespace),
        eq(fluids.name, parsedResourceLocation.path)
      )
    )
    .limit(1)
    .then(value => value[0])

  return result
}, {
  maxAge: 60 * 60,
  name: 'fluid',
  getKey: event => getRouterParam(event, 'id')?.replace(':', '_') ?? ''
})
