export interface APIAccessData {
  label: string;
  key: string;
}
export interface AppConfig {
  apis: {
    [key: string]: APIAccessData;
  }
}
