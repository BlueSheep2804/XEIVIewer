interface ContentsJson {
  type?: string
}

interface PlainTextContentsJson extends ContentsJson {
  type?: 'text'
  text: string
}

interface TranslatableContentsJson extends ContentsJson {
  type?: 'translatable'
  translate: string
  with?: (string | Record<string, string>)[]
  fallback?: string
}

interface KeybindContentsJson extends ContentsJson {
  type?: 'keybind'
  keybind: string
}

function isPlainTextContentsJson(value: unknown): value is PlainTextContentsJson {
  if (!isRecord(value)) return false
  if ('type' in value && typeof value.type === 'string') {
    if (value.type !== 'text') return false
  }
  if (!('text' in value) || typeof value.text !== 'string') return false
  return true
}

function isTranslatableContentsJson(value: unknown): value is TranslatableContentsJson {
  if (!isRecord(value)) return false
  if ('type' in value && typeof value.type === 'string') {
    if (value.type !== 'translatable') return false
  }
  if (!('translate' in value) || typeof value.translate !== 'string') return false
  return true
}

function isKeybindContentsJson(value: unknown): value is KeybindContentsJson {
  if (!isRecord(value)) return false
  if ('type' in value && typeof value.type === 'string') {
    if (value.type !== 'keybind') return false
  }
  if (!('keybind' in value) || typeof value.keybind !== 'string') return false
  return true
}

export class ComponentContents {
  public raw: ContentsJson = {}
  resolve(): string { return '' }
}

export class PlainTextContents implements ComponentContents {
  constructor(public raw: PlainTextContentsJson) {}

  resolve(): string {
    return this.raw.text
  }

  static literal(text: string) {
    return new PlainTextContents({
      type: 'text',
      text
    })
  }

  static EMPTY = PlainTextContents.literal('')
}

export class TranslatableContents implements ComponentContents {
  private args: TextComponent[]

  constructor(public raw: TranslatableContentsJson) {
    if ('with' in raw && typeof raw.with === 'object') {
      this.args = raw.with.map(v => TextComponent.parse(v))
    } else {
      this.args = []
    }
  }

  resolve(): string {
    const { mcLang } = useMCLang()
    const { translate, fallback } = this.raw

    let translated = translate
    if (typeof mcLang.value !== 'undefined') {
      if (translate in mcLang.value) {
        translated = mcLang.value[translate] ?? ''
      } else if (typeof fallback !== 'undefined') {
        translated = fallback
      }
    }

    if (typeof this.args === 'undefined' || this.args.length === 0) {
      return translated
    }

    return this.formatTranslation(translated, this.args.map(value => value.toHtml()))
  }

  private formatTranslation(format: string, args: string[]): string {
    let nextArgIndex = 0

    return format.replace(/%(?:(\d+)\$)?([%s])/g, (placeholder: string, position: string | undefined, conversion: string) => {
      if (conversion === '%') {
        return '%'
      }

      const argIndex = typeof position === 'string'
        ? Number.parseInt(position, 10) - 1
        : nextArgIndex++

      return args[argIndex] ?? placeholder
    })
  }
}

export class KeybindContents implements ComponentContents {
  constructor(public raw: KeybindContentsJson) {}

  resolve(): string {
    const { mcLang } = useMCLang()
    const { keybind } = this.raw

    let display = keybind
    if (typeof mcLang.value !== 'undefined') {
      if (keybind in mcLang.value) {
        display = mcLang.value[keybind] ?? ''
      }
    }
    return `<${display}>`
  }
}

export function parseComponentContents(value: unknown): ComponentContents {
  switch (true) {
    case isPlainTextContentsJson(value):
      return new PlainTextContents(value)
    case isTranslatableContentsJson(value):
      return new TranslatableContents(value)
    case isKeybindContentsJson(value):
      return new KeybindContents(value)

    default:
      break
  }

  return PlainTextContents.EMPTY
}
