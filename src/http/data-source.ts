import { gql } from 'graphql-tag';
import { useState, useEffect } from 'react';

import { client } from '@graphql/index';

const GET_DATA_SOURCES_LIST_QUERY = gql`
  query GetMyDataSourcesList($workspaceId: ID!) {
    getListOfDataSources(workspaceId: $workspaceId) {
      id
      type
      access_token
      refresh_token
      created_at
      updated_at
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
  useEffect(() => {
    if (workspaceId) {
      fetchDataSources();
    }
  }, [workspaceId]);

  return {
    data,
    error,
    loading,
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
