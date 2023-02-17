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
const LIST_ALL_DATA_QUERIES_OF_A_WORKSPACE = gql`
  query ListAllDataQueriesOfAWorkspace($workspaceId: ID!) {
    listAllDataQueriesOfAWorkspace(workspaceId: $workspaceId) {
      id
      name
      data_source_id
      table_name
      fields
    }
  }
`;
const INVITE_USER_TO_WORKSPACE = gql`
  mutation InviteUserToWorkspace($input: InviteUserToWorkspaceInput!) {
    inviteUserToWorkspace(input: $input) {
      message
      createdAt
      workspaceId
      invitedRole
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

export const useDataQueriesOfAWorkspace = (workspaceId: string) => {
  const [data, setData] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchDataQueries = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: LIST_ALL_DATA_QUERIES_OF_A_WORKSPACE,
        variables: {
          workspaceId,
        },
      });
      setData(data.listAllDataQueriesOfAWorkspace);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (workspaceId) {
      fetchDataQueries();
    }
  }, [workspaceId]);

  return {
    data,
    error,
    loading,
  };
};

type InviteUserToWorkspaceInput = {
  email: string;
  role: string;
  workspaceId: string;
};
export const useInviteUserToWorkspaceMutation = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inviteUserToWorkspace = async (input: InviteUserToWorkspaceInput) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: INVITE_USER_TO_WORKSPACE,
        variables: {
          input,
        },
      });
      setData(data.inviteUserToWorkspace);
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
    inviteUserToWorkspace,
  };
};
