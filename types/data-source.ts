export interface IDataSourceType {
  id: string;
  name: string;
  description?: string;
  data_source_id: string;
  table_name: string;
  workspace_id: string;
  fields: string[];
}
