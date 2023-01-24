import { gql } from 'graphql-tag';
import { client } from '@graphql/index';
import { useState } from 'react';

const REGISTER_MUTATION = gql`
  mutation Mutation($input: RegistrationInput!) {
    register(input: $input) {
      user {
        id
        email
        name
        admin
        isAccountActivated
      }
      token
    }
  }
`;

interface RegisterData {
  register: {
    user: {
      id: string;
      email: string;
      name: string;
      admin: boolean;
      isAccountActivated: boolean;
    };
    token: string;
  };
}
export const useRegisterMutation = () => {
  const [data, setData] = useState<RegisterData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const register = async (email: string) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          input: {
            email,
          },
        },
      });
      setData(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    register,
    loading,
    error,
    data,
  };
};
