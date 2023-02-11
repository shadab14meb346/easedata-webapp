import { makeVar, useReactiveVar } from '@apollo/client';
import { WorkspaceType } from 'types/workspace';

export interface WorkspaceStore {
  selectedWorkspace?: WorkspaceType | null;
}

export const workspaceStoreVar = makeVar<WorkspaceStore>({
  selectedWorkspace: null,
});

export const updateWorkspaceStore = (data: WorkspaceStore) => {
  workspaceStoreVar({
    ...workspaceStoreVar(),
    ...data,
  });
};

export const useWorkspaceStore = () => {
  const reactiveExampleVar = useReactiveVar(workspaceStoreVar);
  return reactiveExampleVar;
};
