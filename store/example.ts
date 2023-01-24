import { makeVar, useReactiveVar } from '@apollo/client';

export interface ExampleStore {
  name?: string | null;
  token?: string | null;
  id?: number | null;
}

export const exampleVar = makeVar<ExampleStore>({
  name: null,
  token: null,
  id: null,
});

export const updateExampleStore = (data: ExampleStore) => {
  exampleVar({
    ...exampleVar(),
    ...data,
  });
};

export const useExampleStore = () => {
  const reactiveExampleVar = useReactiveVar(exampleVar);
  return reactiveExampleVar;
};
