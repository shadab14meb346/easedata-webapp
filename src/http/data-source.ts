import { gql } from 'graphql-tag';
import { useState, useEffect } from 'react';

import { client } from '@graphql/index';

const GET_MY_DATA_SOURCES_LIST_QUERY = gql`
  query GetMyDataSourcesList {
    getMyDataSourcesList {
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

export const useMyDataSourcesListQuery = () => {
  const [data, setData] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchDataSources = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_MY_DATA_SOURCES_LIST_QUERY,
      });
      setData(data.getMyDataSourcesList);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataSources();
  }, []);

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
