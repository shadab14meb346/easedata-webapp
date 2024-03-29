import { gql } from 'graphql-tag';
import { useState, useEffect } from 'react';

import { client } from '@graphql/index';

const GET_DATA_SOURCES_LIST_QUERY = gql`
  query GetMyDataSourcesList($workspaceId: ID!) {
    getListOfDataSources(workspaceId: $workspaceId) {
      id
      type
      created_at
      updated_at
      tables {
        label
        name
      }
    }
  }
`;

const GET_HUB_SPOT_CONTACTS = gql`
  query GetHubSpotContacts {
    getHubSpotContacts {
      created_at
      first_name
      last_name
    }
  }
`;
const GET_DATA_SOURCE_TABLE_FIELDS = gql`
  query GetDataSourceTableFields($input: GetDataSourceTableFieldsInput!) {
    getDataSourceTableFields(input: $input) {
      name
      label
      data_type
    }
  }
`;

const DELETE_DATA_SOURCE = gql`
  mutation DeleteDataSource($input: DeleteDataSourceInput!) {
    deleteDataSource(input: $input) {
      id
      success
    }
  }
`;

export const useDataSourcesListQuery = (workspaceId: string) => {
  const [data, setData] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchDataSources = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_DATA_SOURCES_LIST_QUERY,
        variables: {
          workspaceId,
        },
      });
      setData(data.getListOfDataSources);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const refetch = () => {
    setData([]);
    setError(null);
    fetchDataSources();
  };
  useEffect(() => {
    if (workspaceId) {
      fetchDataSources();
    }
  }, [workspaceId]);

  return {
    data,
    error,
    loading,
    refetch,
  };
};

export const useGetHubSpotContactsQuery = () => {
  const [data, setData] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchHubSpotContacts = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_HUB_SPOT_CONTACTS,
      });
      setData(data.getHubSpotContacts);
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
    fetchHubSpotContacts,
  };
};

type GetDataSourceTableFieldsInput = {
  data_source_id: string;
  table_name: string;
};

export const useDataSourceTableFieldsQuery = () => {
  const [data, setData] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDataSourceTableFields = async (
    input: GetDataSourceTableFieldsInput
  ) => {
    try {
      setLoading(true);
      setData([]);
      const { data } = await client.query({
        query: GET_DATA_SOURCE_TABLE_FIELDS,
        variables: {
          input,
        },
      });
      setData(data.getDataSourceTableFields);
    } catch (e: any) {
      setError(e.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    fetchDataSourceTableFields,
  };
};

export const useDeleteDataSourceMutation = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deleteDataSource = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: DELETE_DATA_SOURCE,
        variables: {
          input: {
            id,
          },
        },
      });
      setData(data.deleteDataSource);
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
    deleteDataSource,
  };
};
