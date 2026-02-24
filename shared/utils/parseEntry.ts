import { Identifier } from "./identifier";

export default (entry: String): {
  identifier: Identifier,
  count: Number
} => {
  const match = entry?.match(/^(?:(?<count>\d+)x )?(?<id>[0-9a-z_\/.-]+:[0-9a-z_\/.-]+)$/)

  return {
    identifier: Identifier.parse(match?.groups?.id ?? ""),
    count: Number.parseInt(match?.groups?.count ?? "1")
  }
}