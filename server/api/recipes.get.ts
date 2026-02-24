import { recipes } from "~~/shared/schema";
import { db } from "../utils/db";

export default eventHandler(async (event) => {
  return await db.select().from(recipes)
})