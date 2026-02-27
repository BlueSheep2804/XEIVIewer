import { tagsItem } from "~~/shared/schema";

export default eventHandler(async (event) => {
    return await db.select().from(tagsItem)
})