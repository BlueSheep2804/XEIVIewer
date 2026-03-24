// 実際に受け渡しする検索データ型
export interface Search {
  [key: string]: string | undefined
}

export interface CommonSearch extends Search {
  mod_id?: string
  registry_id?: string
}

// 検索項目を定義するための型
export type SearchDefineEntry = {
  label: string
  items: string[]
}

export interface SearchDefine {
  [key: string]: SearchDefineEntry
}

export interface CommonSearchDefine extends SearchDefine {
  mod_id: SearchDefineEntry
  registry_id: SearchDefineEntry
}

// アイテム
export type ItemSearch = CommonSearch
export type ItemSearchDefine = CommonSearchDefine

// レシピ
export interface RecipeSearch extends CommonSearch {
  input_id?: string
  output_id?: string
}

export interface RecipeSearchDefine extends CommonSearchDefine {
  input_id: SearchDefineEntry
  output_id: SearchDefineEntry
}

// タグ
export interface TagSearch extends CommonSearch {
  include_id?: string
}

export interface TagSearchDefine extends CommonSearchDefine {
  include_id: SearchDefineEntry
}

// Mod
export interface ModSearch extends Search {
  mod_id?: string
  authors?: string
  license?: string
}

export interface ModSearchDefine extends SearchDefine {
  mod_id: SearchDefineEntry
  authors: SearchDefineEntry
  license: SearchDefineEntry
}
