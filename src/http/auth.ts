import { gql } from 'graphql-tag';
import { client } from '@graphql/index';
import { useState } from 'react';
import { User } from 'types/user';

const REGISTER_MUTATION = gql`
  mutation Mutation($input: RegistrationInput!) {
    register(input: $input) {
      user {
        id
        email
        name
        admin
      }
      token
    }
  }
`;
const GET_ME_QUERY = gql`
  query GetMe {
    getMe {
      id
      email
      name
      admin
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        name
        admin
      }
      token
    }
  }
`;

interface RegisterResponse {
  user: User;
  token: string;
}
interface LoginResponse {
  user: User;
  token: string;
}
interface ILoginInput {
  email: string;
  password: string;
}
interface IRegisterInput {
  email: string;
  password: string;
}
export const useRegisterMutation = () => {
  const [data, setData] = useState<RegisterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const register = async (input: IRegisterInput) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          input,
        },
      });
      setData(data.register);
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

export const useLoginMutation = () => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const login = async (input: ILoginInput) => {
    try {
      setLoading(true);
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input,
        },
      });
      setData(data.login);
      localStorage.setItem('jwt-token', data.login.token);
      localStorage.setItem('user', JSON.stringify(data.login.user));
    } catch (e: any) {
      setError(e.message);
      localStorage.removeItem('user');
      localStorage.removeItem('jwt-token');
    } finally {
      setLoading(false);
    }
  };
  return {
    login,
    loading,
    error,
    data,
  };
};
export const getMe = async () => {
  return await client.query({
    query: GET_ME_QUERY,
  });
};
