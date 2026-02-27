import { Identifier } from "./identifier";

const regex = /^(?:(?<count>\d+)x )?(?<id>(?:#?[0-9a-z_\/.-]+:[0-9a-z_\/.-]+(?:, ?)?)*)$/

export class Ingredient {
  public count: Number
  public value: IngredientValue[]
  constructor(entry: string) {
    const match = entry.match(regex)
    this.count = Number.parseInt(match?.groups?.count ?? "1")

    const idList = match?.groups?.id?.split(",") ?? []
    this.value = idList.map((id) => {
      if (id.startsWith("#")) {
        return {
          value: Identifier.parse(id.substring(1)),
          isTag: true
        }
      }
      return {
        value: Identifier.parse(id),
        isTag: false
      }
    })
  }
}

export interface IngredientValue {
  value: Identifier,
  isTag: boolean
}