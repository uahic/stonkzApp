export interface SearchResult {
  icon?: string;
  command: () => void;
  description: string;
  symbol: string;
  type: string;
}

export interface SearchGroupResult {
  icon?: string;
  source: string;
  results: SearchResult[];
}
