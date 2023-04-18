import HubSpotIcon from '../../public/hubspot-icon.svg';
const scopes =
  'crm.lists.read%20crm.objects.contacts.read%20crm.schemas.custom.read%20crm.objects.custom.read%20crm.schemas.contacts.read%20crm.objects.companies.read%20crm.schemas.companies.read%20crm.schemas.deals.read%20crm.objects.owners.read%20crm.objects.quotes.read';
const MS_OFFICE_SCOPES = encodeURI(
  ['offline_access', 'Files.ReadWrite'].join(' ')
);
const GSHEET_SCOPES = encodeURI(
  [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive',
  ].join(' ')
);

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
export const getMSOfficeOauthURL = ({
  jwt,
  workspaceId,
}: OauthURLInput): string => {
  const state = JSON.stringify({
    token: jwt,
    workspaceId,
  });
  const INSTALL_OAUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.NEXT_PUBLIC_MS_OFFICE_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_MS_OFFICE_REDIRECT_URI}&response_mode=query&scope=${MS_OFFICE_SCOPES}&state=${state}`;
  return INSTALL_OAUTH_URL;
};
export const getGSheetOauthURL = ({
  jwt,
  workspaceId,
}: OauthURLInput): string => {
  const state = JSON.stringify({
    token: jwt,
    workspaceId,
  });
  const INSTALL_OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_GA_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GA_REDIRECT_URI}&scope=${GSHEET_SCOPES}&access_type=offline&state=${state}`;
  return INSTALL_OAUTH_URL;
};

export const getDataSourceIcon = (dataSourceType: string) => {
  switch (dataSourceType) {
    case 'HUB_SPOT':
      return '/hubspot-icon.svg';
    case 'MS_OFFICE_SHEET':
      return '/ms-office-xl-icon.svg';
    case 'GSHEET':
      return '/gsheet-icon.svg';
    default:
      return '';
  }
};
