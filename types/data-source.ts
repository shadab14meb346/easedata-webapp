export interface IDataSourceType {
  id: string;
  name: string;
  description?: string;
  data_source_id: string;
  table_name: string;
  workspace_id: string;
  fields: string[];
}

export enum DataSourceType {
  HUB_SPOT = 'HubSpot',
  GoogleAnalytics = 'GoogleAnalytics',
}
