import { useState } from 'react';
import { gql } from 'graphql-tag';
import { client } from '@graphql/index';
import { OperatorType } from 'types/filter';

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
const EXECUTE_QUERY = gql`
  query ExecuteQuery($input: ExecuteQueryInput!, $limit: Int, $after: String) {
    executeQuery(input: $input, limit: $limit, after: $after) {
      data
      page_info {
        has_next_page
        has_previous_page
        start_cursor
        end_cursor
      }
    }
  }
`;
const SCHEDULE_QUERY_MUTATION = gql`
  mutation ScheduleQuery($input: ScheduleQueryInput!) {
    scheduleQuery(input: $input) {
      id
      query_id
      status
      interval
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

type filterInput = {
  field: string;
  operator: OperatorType;
  value: string;
  high_value?: string;
};
type ExecuteQueryInput = {
  data_source_id: number;
  fields: string[];
  table_name: string;
  filters?: filterInput[];
  limit?: number;
  after?: string;
};
export const useExecuteQuery = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<any | null>(null);
  const executeQuery = async (input: ExecuteQueryInput) => {
    const { after, limit, ...restInput } = input;
    try {
      setLoading(true);
      const { data } = await client.query({
        query: EXECUTE_QUERY,
        variables: {
          input: restInput,
          limit: limit || 100,
          after: after || '0',
        },
      });
      setData((prevData: any[]) => [...prevData, ...data.executeQuery.data]);
      setPageInfo(data.executeQuery.page_info);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData([]);
    setPageInfo(null);
  };
  return {
    executeQuery,
    loading,
    error,
    data,
    pageInfo,
    reset,
  };
};

type ScheduleQueryInput = {
  query_id: string;
  interval: string;
  gsheet_url: string;
};
export const useScheduleQuery = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scheduleQuery = async (input: ScheduleQueryInput) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: SCHEDULE_QUERY_MUTATION,
        variables: {
          input,
        },
      });
      setData(data.scheduleQuery);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    scheduleQuery,
    loading,
    error,
    data,
  };
};
