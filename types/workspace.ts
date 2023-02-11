export enum WorkspaceRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}
export interface WorkspaceType {
  id: string;
  name: string;
  role: WorkspaceRole;
}
