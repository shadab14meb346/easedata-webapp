import HubSpotIcon from '../../public/hubspot-icon.svg';
const scopes =
  'crm.lists.read%20crm.objects.contacts.read%20crm.schemas.custom.read%20crm.objects.custom.read%20crm.schemas.contacts.read%20crm.objects.companies.read%20crm.schemas.companies.read%20crm.schemas.deals.read%20crm.objects.owners.read%20crm.objects.quotes.read';
const gaScopes = 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics.readonly';

type OauthURLInput = {
  jwt: string;
  workspaceId: string;
};
export const getHubSpotOauthURL = ({
  jwt,
  workspaceId,
}: OauthURLInput): string => {
  const state = JSON.stringify({
    token: jwt,
    workspaceId,
  });
  const INSTALL_OAUTH_URL = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUB_SPOT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_HUB_SPOT_REDIRECT_URI}&scope=${scopes}&state=${state}`;
  return INSTALL_OAUTH_URL;
};
export const getGAOauthURL = ({ jwt, workspaceId }: OauthURLInput): string => {
  const state = JSON.stringify({
    token: jwt,
    workspaceId,
  });
  const clientId = process.env.NEXT_PUBLIC_GA_CLIENT_ID;
  const redirectURI = process.env.NEXT_PUBLIC_GA_REDIRECT_URI;
  const INSTALL_OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=${gaScopes}&state=${state}&response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&access_type=offline&prompt=consent`;
  return INSTALL_OAUTH_URL;
};

export const getDataSourceIcon = (dataSourceType: string) => {
  switch (dataSourceType) {
    case 'HUB_SPOT':
      return '/hubspot-icon.svg';
    case 'GOOGLE_ANALYTICS':
      return '/ga-icon.svg';
    default:
      return '';
  }
};
