export class Identifier {
  constructor(public readonly namespace: string, public readonly path: string) {}

  get full() {
    return `${this.namespace}:${this.path}`
  }

  static withDefaultNamespace(path: string) {
    return new Identifier("minecraft", path)
  }

  static parse(str: string) {
    if (str.includes(":")) {
      const split = str.split(":", 2)
      return new Identifier(split[0] ?? "", split[1] ?? "")
    } else {
      return this.withDefaultNamespace(str)
    }
  }
}