import { and, eq } from "drizzle-orm";
import { recipes } from "../../../shared/schema";
import { db } from "../../utils/db";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id") ?? "";
  const parsedResourceLocation = Identifier.parse(id);
  const result = await db
    .select()
    .from(recipes)
    .where(
      and(
        eq(recipes.namespace, parsedResourceLocation.namespace),
        eq(recipes.path, parsedResourceLocation.path)
      )
    )
    .limit(1)
    .then((value) => value[0]);

  return result;
});