export class Identifier {
  constructor(public readonly namespace: string, public readonly path: string) {}

  get full() {
    return `${this.namespace}:${this.path}`
  }

  get simple() {
    if (this.namespace === 'minecraft') {
      return this.path
    }
    return this.full
  }

  equals(other: Identifier): boolean {
    return (
      this.namespace === other.namespace
      && this.path === other.path
    )
  }

  static withDefaultNamespace(path: string) {
    return new Identifier('minecraft', path)
  }

  static parse(str: string) {
    if (str.includes(':')) {
      const split = str.split(':', 2)
      return new Identifier(split[0] ?? '', split[1] ?? '')
    } else {
      return this.withDefaultNamespace(str)
    }
  }
}
