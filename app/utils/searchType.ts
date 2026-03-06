// 実際に受け渡しする検索データ型
export interface Search {
  mod_id?: string
  registry_id?: string
}

// 検索項目を定義するための型
export type SearchDefineEntry = {
  label: string,
  items: string[]
}

export interface SearchDefine {
  mod_id: SearchDefineEntry
  registry_id: SearchDefineEntry
}


// アイテム
export interface ItemSearch extends Search {}
export interface ItemSearchDefine extends SearchDefine {}


// レシピ
export interface RecipeSearch extends Search {
  input_id?: string
  output_id?: string
}

export interface RecipeSearchDefine extends SearchDefine {
  input_id: SearchDefineEntry
  output_id: SearchDefineEntry
}


// タグ
export interface TagSearch extends Search {
  include_id?: string
}

export interface TagSearchDefine extends SearchDefine {
  include_id: SearchDefineEntry
}
