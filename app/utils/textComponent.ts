import sanitize from 'sanitize-html'

// TextComponent
export class TextComponent {
  constructor(
    private contents: ComponentContents,
    private extra: TextComponent[] = [],
    private style: Style = new Style()
  ) {}

  // toString(): string {
  //   return ''
  // }

  toHtml(): string {
    return this.style.apply(
      sanitize(
        this.contents.resolve(),
        {
          allowedTags: [
            'strong', // bold
            'i', // italic
            'ins', // underlined
            'del', // strikethrough
            'span'
          ],
          allowedAttributes: {
            span: ['style']
          }
        }
      )
      + this.extra.map(v => v.toHtml()).join('')
    )
  }

  static fromJson(value: string): TextComponent {
    let jsonData: unknown
    try {
      jsonData = JSON.parse(value)
    } catch {
      return this.EMPTY
    }
    return this.parse(jsonData)
  }

  static parse(value: unknown): TextComponent {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return new TextComponent(
          PlainTextContents.EMPTY,
          value.map(value => TextComponent.parse(value))
        )
      } else {
        return new TextComponent(
          parseComponentContents(value),
          [],
          Style.parse(value)
        )
      }
    } else if (typeof value === 'string') {
      return new TextComponent(PlainTextContents.literal(value))
    }
    return this.EMPTY
  }

  // private static fromJson(value: unknown): TextComponent {
  //   if (typeof value === 'string') {
  //     return new TextComponent(PlainTextContents.literal(value))
  //   }
  //   if (Array.isArray(value)) {
  //     return new TextComponent(
  //       PlainTextContents.EMPTY,
  //       value.map(child => this.fromJson(child))
  //     )
  //   }
  //   if (!isRecord(value)) {
  //     return this.EMPTY
  //   }

  //   return new TextComponent(
  //     this.parseJson(value),
  //     Array.isArray(value.extra)
  //       ? value.extra.map(child => this.fromJson(child))
  //       : [],
  //     typeof value.color === 'string' ? value.color : 'white'
  //   )
  // }

  static EMPTY = new TextComponent(PlainTextContents.EMPTY)
}
