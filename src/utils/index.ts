import HubSpotIcon from '../../public/hubspot-icon.svg';
const scopes =
  'crm.lists.read%20crm.objects.contacts.read%20crm.schemas.custom.read%20crm.objects.custom.read%20crm.schemas.contacts.read%20crm.objects.companies.read%20crm.schemas.companies.read%20crm.schemas.deals.read%20crm.objects.owners.read%20crm.objects.quotes.read';

type GetHubSpotOauthURLInput = {
  jwt: string;
  workspaceId: string;
};
export const getHubSpotOauthURL = ({
  jwt,
  workspaceId,
}: GetHubSpotOauthURLInput): string => {
  const state = JSON.stringify({
    token: jwt,
    workspaceId,
  });
  const INSTALL_OAUTH_URL = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUB_SPOT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_HUB_SPOT_REDIRECT_URI}&scope=${scopes}&state=${state}`;
  return INSTALL_OAUTH_URL;
};

export const getDataSourceIcon = (dataSourceType: string) => {
  switch (dataSourceType) {
    case 'HUB_SPOT':
      return '/hubspot-icon.svg';
    default:
      return '';
  }
};
