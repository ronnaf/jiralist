export type JiraUser = {
  self: string;
  key: string;
  accountId: string;
  name: string;
  emailAddress: string;
  avatarUrls: {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  };
  displayName: string;
  active: boolean;
  timeZone: string;
  groups: {
    size: number;
    items: any[];
  };
  applicationRoles: {
    size: number;
    items: any[];
  };
};
