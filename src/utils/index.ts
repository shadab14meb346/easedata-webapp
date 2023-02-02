const scopes =
  'crm.lists.read%20crm.objects.contacts.read%20crm.schemas.custom.read%20crm.objects.custom.read%20crm.schemas.contacts.read%20crm.objects.companies.read%20crm.schemas.companies.read%20crm.schemas.deals.read%20crm.objects.owners.read%20crm.objects.quotes.read';

export const getHubSpotOauthURL = (jwt: string): string => {
  const state = JSON.stringify({
    token: jwt,
  });
  const INSTALL_OAUTH_URL = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUB_SPOT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_HUB_SPOT_REDIRECT_URI}&scope=${scopes}&state=${state}`;
  return INSTALL_OAUTH_URL;
};
