import { gql } from 'graphql-tag';
import { client } from '@graphql/index';
import { useState, useEffect } from 'react';

const FETCH_CONTINENTS_QUERY = gql`
  query continents {
    continents {
      code
      name
    }
  }
`;

export const useContinentsQuery = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchContinents = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: FETCH_CONTINENTS_QUERY,
      });
      setData(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContinents();
  }, []);
  return {
    loading,
    error,
    data,
  };
};
