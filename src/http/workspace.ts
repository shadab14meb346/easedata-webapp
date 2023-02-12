import { client } from '@graphql/index';
import { updateWorkspaceStore } from '@store/workspace';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

const GET_MY_WORKSPACES = gql`
  query GetMyWorkspaces {
    getMyWorkspaces {
      id
      name
      role
    }
  }
`;
const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      id
      name
      role
    }
  }
`;

export const useMyWorkspacesListQuery = () => {
  const [data, setData] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchMyWorkspaces = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_MY_WORKSPACES,
      });
      setData(data.getMyWorkspaces);
      //Currently we are setting the first workspace as the selected workspace by default
      updateWorkspaceStore({
        selectedWorkspace: data.getMyWorkspaces[0],
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyWorkspaces();
  }, []);

  return {
    data,
    error,
    loading,
    refetch: fetchMyWorkspaces,
  };
};

export const useCreateWorkspaceMutation = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const createWorkspace = async (name: string) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: CREATE_WORKSPACE_MUTATION,
        variables: {
          input: {
            name,
          },
        },
      });
      console.log(data);
      setData(data.createWorkspace);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    error,
    loading,
    createWorkspace,
  };
};
