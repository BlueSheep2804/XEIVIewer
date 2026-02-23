import { and, eq } from "drizzle-orm";
import { recipeSmelting } from "../../../shared/schema";
import { db } from "../../utils/db";

export default eventHandler(async (event) => {
  const parsedResourceLocation = Identifier.parse(getRouterParam(event, "id") ?? "")
  const result = await db
    .select()
    .from(recipeSmelting)
    .where(
      and(
        eq(recipeSmelting.namespace, parsedResourceLocation.namespace),
        eq(recipeSmelting.path, parsedResourceLocation.path)
      )
    )
    .limit(1)
    .then((value) => {
      return value[0]
    })
    return result
})