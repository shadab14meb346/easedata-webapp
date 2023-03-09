import { makeVar, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { WorkspaceType } from 'types/workspace';

export interface WorkspaceStore {
  selectedWorkspace?: WorkspaceType | null;
}

export const workspaceStoreVar = makeVar<WorkspaceStore>({
  selectedWorkspace: null,
});

const persistWorkspaceStore = (data: WorkspaceStore) => {
  localStorage.setItem('workspaceStore', JSON.stringify(data));
};
export const updateWorkspaceStore = (data: WorkspaceStore) => {
  workspaceStoreVar({
    ...workspaceStoreVar(),
    ...data,
  });
  persistWorkspaceStore(workspaceStoreVar());
};

export const useWorkspaceStore = () => {
  const reactiveExampleVar = useReactiveVar(workspaceStoreVar);
  useEffect(() => {
    const persistedWorkspaceStore = localStorage.getItem('workspaceStore');
    if (persistedWorkspaceStore) {
      updateWorkspaceStore(JSON.parse(persistedWorkspaceStore));
    }
  }, []);
  return reactiveExampleVar;
};
