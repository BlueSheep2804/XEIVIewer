// Styles
interface StyleJson {
  color?: string
  shadowColor?: number
  bold?: boolean
  italic?: boolean
  underlined?: boolean
  strikethrough?: boolean
  obfuscated?: boolean
  clickEvent?: unknown
  hoverEvent?: unknown
  insertion?: string
  font?: string
}

function isStyleJson(value: unknown): value is StyleJson {
  if (!isRecord(value)) return false
  if ('color' in value && typeof value.color !== 'string') return false
  if ('shadowColor' in value && typeof value.shadowColor !== 'number') return false
  if ('bold' in value && typeof value.bold !== 'boolean') return false
  if ('italic' in value && typeof value.italic !== 'boolean') return false
  if ('underlined' in value && typeof value.underlined !== 'boolean') return false
  if ('strikethrough' in value && typeof value.strikethrough !== 'boolean') return false
  if ('obfuscated' in value && typeof value.obfuscated !== 'boolean') return false
  if ('insertion' in value && typeof value.insertion !== 'string') return false
  if ('font' in value && typeof value.font !== 'string') return false
  return true
}

export class Style {
  constructor(
    public color: string = 'white',
    public shadowColor: number = 0,
    public bold: boolean = false,
    public italic: boolean = false,
    public underlined: boolean = false,
    public strikethrough: boolean = false,
    public obfuscated: boolean = false,
    public clickEvent: unknown = {},
    public hoverEvent: unknown = {},
    public insertion: string = '',
    public font: string = 'minecraft:default'
  ) {}

  apply(value: string): string {
    const tags = [
      this.bold ? 'strong' : '',
      this.italic ? 'i' : '',
      this.underlined ? 'ins' : '',
      this.strikethrough ? 'del' : '',
      this.obfuscated ? 'span style="filter: blur(2px)"' : '',
      this.colorTag()
    ]
    return (
      tags.map(t => t === '' ? '' : `<${t}>`).join('')
      + value
      + tags.reverse().map(t => t === '' ? '' : `</${t.split(' ')[0]}>`).join('')
    )
  }

  private colorTag(): string {
    if (this.color.startsWith('#')) {
      return `span style="color:${this.color}"`
    } else if (this.color !== 'white' && Style.isInColors(this.color)) {
      return `span style="color:${Style.COLORS[this.color]}"`
    }
    return ''
  }

  static parse(value: unknown) {
    if (!isStyleJson(value)) {
      return this.EMPTY
    }

    return new Style(
      value.color,
      value.shadowColor,
      value.bold,
      value.italic,
      value.underlined,
      value.strikethrough,
      value.obfuscated,
      value.clickEvent,
      value.hoverEvent,
      value.insertion,
      value.font
    )
  }

  static isInColors(value: unknown): value is keyof typeof Style.COLORS {
    if (typeof value !== 'string') return false
    return value in Style.COLORS
  }

  static EMPTY = new Style()

  static COLORS = {
    black: '#000000',
    dark_blue: '#0000AA',
    dark_green: '#00AA00',
    dark_aqua: '#00AAAA',
    dark_red: '#AA0000',
    dark_purple: '#AA00AA',
    gold: '#FFAA00',
    gray: '#AAAAAA',
    dark_gray: '#555555',
    blue: '#5555FF',
    green: '#55FF55',
    aqua: '#55FFFF',
    red: '#FF5555',
    light_purple: '#FF55FF',
    yellow: '#FFFF55',
    white: '#FFFFFF'
  }
}
