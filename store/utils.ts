import { makeVar, useReactiveVar } from '@apollo/client';

export interface IUtilState {
  redirectAfterSignInUrl: string | null;
}
export const utilsStateVar = makeVar<IUtilState>({
  redirectAfterSignInUrl: null,
});

export const setRedirectAfterSignInUrl = (url: string) => {
  utilsStateVar({
    ...utilsStateVar(),
    redirectAfterSignInUrl: url,
  });
};

export const useReactiveUtilsState = () => useReactiveVar(utilsStateVar);
