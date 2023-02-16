import { useState } from 'react';
import { gql } from 'graphql-tag';
import { client } from '@graphql/index';

const CREATE_QUERY_MUTATION = gql`
  mutation Mutation($input: DataQueryInput!) {
    createDataQuery(input: $input) {
      id
      name
      description
      data_source_id
      table_name
      workspace_id
      fields
      created_at
      updated_at
    }
  }
`;
type CreateQueryInput = {
  data_source_id: number;
  description?: string;
  fields: string[];
  name: string;
  table_name: string;
  workspace_id: number;
};
export const useCreateQueryMutation = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const createQuery = async (input: CreateQueryInput) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: CREATE_QUERY_MUTATION,
        variables: {
          input,
        },
      });
      setData(data.createDataQuery);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    createQuery,
    loading,
    error,
    data,
  };
};
